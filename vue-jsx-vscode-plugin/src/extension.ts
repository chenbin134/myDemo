/**
 * vue SFC render函数中对常用的标签进行代码补全
 * @Author chenbin
 * @Date 2022-08-28
 */

import * as vscode from 'vscode';

type typeSingleTags = Array<{
	name:string,
	attrs: string[]
}>

const doubleTags: string[] = ['div', 'span'];

const singleTags: typeSingleTags = [{
	name: 'img',
	attrs: ['src', 'alt']
}, {
	name: 'input',
	attrs: ['type']
}
]

let provider:vscode.Disposable;

export function activate(context: vscode.ExtensionContext) {
	
	provider = vscode.languages.registerCompletionItemProvider('vue', {

		provideCompletionItems(document:vscode.TextDocument, position:vscode.Position,token,context) {

			const completionItems1:vscode.CompletionItem[] = doubleTags.map(tag => {
				const template = `<${tag} class="$1">$0</${tag}>`
				const SnippetString: vscode.SnippetString = new vscode.SnippetString(template);

				return {
					label: tag,
					insertText: SnippetString,
					detail: '陈斌的jsx语法提示',
					documentation: template
				}
			})

			const completionItems2:vscode.CompletionItem[] = singleTags.map(tag => {

				const template = `<${tag.name} ${tag.attrs.map((attr,index) => {
					return `${attr}="$${index}"`
				}).join(' ')} />`
				const SnippetString: vscode.SnippetString = new vscode.SnippetString(template);

				return {
					label: tag.name,
					insertText: SnippetString,
					detail: '陈斌的jsx语法提示',
					documentation: template
				}

			})

			return [...completionItems1,...completionItems2];
		},

});
		
context.subscriptions.push(provider);
}

// this method is called when your extension is deactivated
export function deactivate() {
	provider.dispose();
}
