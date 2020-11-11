#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');

program
    .version('0.0.3')
    .requiredOption('-n --yourname <yourname>', 'Your name')
    .option('-g --glad', 'Tell us you are happy')
    .parse(process.argv);

const promptList = [
    {
        type: 'input',
        name: "phoneNumber",
        message: 'What is your phone number?',
        validate: function(val) {
            if (val.match(/\d{11}/g)) {
                return true;
            }
            return 'Please type 11 bytes number:';
        }
    },{
        type: "confirm",
        message: "是否使用监听？",
        name: "watch",
        prefix: "前缀"
    },{
        type: "confirm",
        message: "是否进行文件过滤？",
        name: "filter",
        suffix: "后缀",
        when: function(answers) { // 当watch为true的时候才会提问当前问题
            return answers.watch
        }
    },{
        type: 'list',
        message: '请选择一种水果:',
        name: 'fruit',
        choices: [
            "Apple",
            "Pear",
            "Banana"
        ],
        filter: function (val) { // 使用filter将回答变为小写
            return val.toLowerCase();
        }
    },{
        type: 'rawlist',
        message: '请选择一种水果:',
        name: 'fruit',
        choices: [
            "Apple",
            "Pear",
            "Banana"
        ]
    },{
        type: "checkbox",
        message: "选择颜色:",
        name: "color",
        choices: [
            {
                name: "red"
            },
            new inquirer.Separator(), // 添加分隔符
            {
                name: "blur",
                checked: true // 默认选中
            },
            {
                name: "green"
            },
            new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
            {
                name: "yellow"
            }
        ]
    },{
        type: "password", // 密码为密文输入
        message: "请输入密码：",
        name: "pwd"
    }
];

if (program.yourname) {
    console.log(`Hello, ${program.yourname}! ${program.glad ? 'I am very happy to see you!' : ''}`);
    inquirer.prompt(promptList).then(answers => {
        console.log(answers);
    }).catch(err => {
        console.error(err);
    });
}