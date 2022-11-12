
// importação de módulos para criação e controle de Janelas
const { app, BrowserWindow } = require('electron');
const { url } = require('inspector');
const path = require('path');

// Função para criação de janela
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600, 
        // Precarregar a janela com um Script
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // caminho do arquivo HTML a ser carregado
    win.loadFile('index.html');
}

// Chamar a Criação de janela quando o app estiver pronto
app.whenReady().then(() => {
    createWindow();

    // criar janela caso apenas caso não haja nenhuma outra
    app.on("activate", () => {
        BrowserWindow.getAllWindows().length === 0 ? createWindow() : {};
    });
});

// Encerrar app se todas as janelas forem fechadas
app.on("window-all-closed", () => {
    // Exceção da função para MacOS
    process.platform !== 'darwin' ? app.quit() : {};
});