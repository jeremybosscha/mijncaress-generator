// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { addListener } from 'cluster';
import { SpawnSyncOptionsWithStringEncoding } from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "caress-generator" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.caress-generator', () => {
		let selectedType: GeneratorType;
		// Display a message box to the user
		// const quickpicks = [new vscode.QuickInputButtons()]
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = getQuickPicks();
		quickPick.show();
		quickPick.onDidChangeSelection((item) => {
			selectedType = JSON.parse(JSON.stringify(item));
			vscode.window.showInformationMessage(JSON.stringify(item));
			vscode.window.showInputBox({ placeHolder: 'Give the new ' + selectedType.description.toLowerCase() + ' a name...' }).then((x) => {
				console.log(x);
			});
		});



	});

	context.subscriptions.push(disposable);
}

function getQuickPicks(): Array<GeneratorType> {
	let list = [];
	const pageItem: GeneratorType = {
		'description': 'Page',
		'detail': 'src/pages/',
		'label': 'Generate a page'
	};
	const serviceItem: GeneratorType = {
		'description': 'Service',
		'detail': 'src/services/',
		'label': 'Generate a service'
	};
	const moduleItem: GeneratorType = {
		'description': 'Module',
		'detail': 'src/modules/',
		'label': 'Generate a module'
	};
	const sharedModuleItem: GeneratorType = {
		'description': 'Shared module',
		'detail': 'src/sharedModules',
		'label': 'Generate a shared module'
	};

	const entityItem: GeneratorType = {
		'description': 'Entity',
		'detail': 'src/entities',
		'label': 'Generate an entity'
	};

	list.push(pageItem);
	list.push(serviceItem);
	list.push(moduleItem);
	list.push(sharedModuleItem);
	list.push(entityItem);

	return list;
}

class GeneratorType implements vscode.QuickPickItem {
	label: string;
	description: string;
	detail: string;
	constructor(label: string, description: string, detail: string) {
		this.label = label;
		this.description = description;
		this.detail = detail;
	}

}

// this method is called when your extension is deactivated
export function deactivate() { }
