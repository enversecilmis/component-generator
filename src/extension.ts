import * as vscode from 'vscode';
import config from './config';
import { capitalize } from './utils';







export function activate(context: vscode.ExtensionContext) {
	
	let disposable = vscode.commands.registerCommand('component-generator.nextComponentSass', async () => {
		const folders = vscode.workspace.workspaceFolders
		if(!folders) return

		const input = await vscode.window.showInputBox({ placeHolder: "Component", prompt: "Enter Your Component Name" })
		if(!input) return


		
		let compName: string
		if (input.includes(" ")){
			compName = input
						.split(" ")
						.map(capitalize)
						.join("")
		}
		else 
			compName = input.charAt(0).toUpperCase() + input.slice(1)

		

		const wsPath = folders[0].uri.fsPath
		const fileTsxPath = vscode.Uri.file(`${wsPath}/src/components/${compName}/${compName}.tsx`)
		const fileSassPath = vscode.Uri.file(`${wsPath}/src/components/${compName}/${compName}.module.scss`)

		const wsedit = new vscode.WorkspaceEdit();
		wsedit.createFile(fileTsxPath, { ignoreIfExists: true })
		wsedit.createFile(fileSassPath, { ignoreIfExists: true })
		
		
		const componentContent = config.componentTemplate.replace(/\$FileName/g, compName)
		const sassContent = config.sassTemplate
		
		wsedit.insert(fileTsxPath, new vscode.Position(0, 0), componentContent)
		wsedit.insert(fileSassPath, new vscode.Position(0, 0), sassContent)

		await vscode.workspace.applyEdit(wsedit, { isRefactoring: true })
		await vscode.workspace.saveAll()
	});





	let disposable2 = vscode.commands.registerTextEditorCommand('component-generator.insertNewComponent', async (editor, edit) => {
		const folders = vscode.workspace.workspaceFolders
		if(!folders) return

		const input = await vscode.window.showInputBox({ placeHolder: "Component", prompt: "Enter Your Component Name" })
		if(!input) return

		
		
		let compName: string
		if (input.includes(" ")){
			compName = input
						.split(" ")
						.map(capitalize)
						.join("")
		}
		else 
			compName = input.charAt(0).toUpperCase() + input.slice(1)

		

		const wsPath = folders[0].uri.fsPath
		const fileTsxPath = vscode.Uri.file(`${wsPath}/src/components/${compName}/${compName}.tsx`)
		const fileSassPath = vscode.Uri.file(`${wsPath}/src/components/${compName}/${compName}.module.scss`)

		const componentContent = config.componentTemplate.replace(/\$FileName/g, compName)
		const sassContent = config.sassTemplate
		
		
		const wsedit = new vscode.WorkspaceEdit();
		wsedit.createFile(fileTsxPath, { ignoreIfExists: true })
		wsedit.createFile(fileSassPath, { ignoreIfExists: true })
		
		wsedit.insert(fileTsxPath, new vscode.Position(0, 0), componentContent)
		wsedit.insert(fileSassPath, new vscode.Position(0, 0), sassContent)

		
		// editor.selections.forEach((selection) => {
		// 	edit.insert(selection.active, `<${compName} />`)
		// })
		
		vscode.workspace.applyEdit(wsedit)
		editor.edit((editBuilder) =>  editBuilder.insert(editor.selection.active, `<${compName} />`) )


		await vscode.workspace.applyEdit(wsedit, { isRefactoring: true })
		await vscode.workspace.saveAll()
	});



	context.subscriptions.push(disposable, disposable2);
}





export function deactivate() {}
