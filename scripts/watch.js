const { spawnSync, execSync } = require('child_process');
const printf = require('printf');
const path = require('path');
const chalk = require('chalk');
var commandExists = require('command-exists');
var watch = require('node-watch');

commandExists('dtkt').then(function () {
    console.log(chalk.green('dtkt is installed!'));
    console.log(chalk.blueBright('Watching for changes in src/**/* ...'));
    watch('src', { recursive: true }, function(evt, name) {
        const dir = path.dirname(name);
        const file = path.basename(name);
        const ext = path.extname(name);
        const changedFile = path.join(dir, file);
        const runFile = path.join('./dist/', file.replace(ext, '.js'));

        console.log(chalk.yellowBright(printf('Updated: %s', changedFile)));
        console.log(chalk.blueBright('$ yarn build'));
        try {
            const stdout = execSync('yarn build');
            console.log(stdout.toString().trim());
        } catch (error) {
            console.log(chalk.red("Build failed:"), error.stdout.toString().trim())
            return;
        }

        const startTime = new Date().getTime();
        const command = printf('dtkt f run -r -f %s', runFile);
        console.log(chalk.blueBright(printf("$ %s", command)));
        try {
            const parts = command.split(' ');
            const { stdout } = spawnSync(parts[0], parts.slice(1));
            console.log(stdout.toString().trim())
            console.log(chalk.green(printf("Finished in %dms.", new Date().getTime() - startTime)));    
        } catch (error) {
            console.log(chalk.red("Run failed:"), error.stdout.toString().trim())
            console.log(chalk.red(printf("Finished in %dms.", new Date().getTime() - startTime)));
        }
    });
}).catch(function () {
    console.error(chalk.red('dtkt is not installed!'));
    console.log(chalk.yellow('To install it, run: TBD'));
});