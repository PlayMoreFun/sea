const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;

// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

class DictionaryBlocks {
    getInfo (locale) {
        formatMessage.setup({locale});

        this.dict = JSON.parse(`{${formatMessage({
            id: 'dictionary.default',
            default: '"one":"thing"'
        })}}`);

        return {
            id: 'dictionary',
            name: formatMessage({
                id: 'name',
                default: 'Dictionary'
            }),
            blockIconURI,
            blocks: [
                {
                    opcode: 'decode',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'dictionary.decode',
                        default: 'decode JSON format [DATA] to dictionary'
                    }),
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: `{${formatMessage({
                                id: 'dictionary.default',
                                default: '"one":"thing"'
                            })}}`,
                        }
                    }
                },
                {
                    opcode: 'json',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'dictionary.json',
                        default: 'dictionary in JSON format'
                    })
                },
                '---',
                {
                    opcode: 'get',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'dictionary.get',
                        default: 'entry [KEY] of dictionary'
                    }),
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'dictionary.key',
                                default: 'one'
                            }),
                        }
                    }
                },
                {
                    opcode: 'set',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'dictionary.set',
                        default: 'store [VALUE] with [KEY] to dictionary'
                    }),
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'dictionary.key',
                                default: 'one'
                            }),
                        },
                        VALUE: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'dictionary.value',
                                default: 'thing'
                            }),
                        }
                    }
                },
                {
                    opcode: 'remove',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'dictionary.remove',
                        default: 'delete [KEY] of dictionary'
                    }),
                    arguments: {
                        KEY: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'dictionary.key',
                                default: 'one'
                            }),
                        }
                    }
                },
                {
                    opcode: 'clear',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'dictionary.clear',
                        default: 'delete all of dictionary'
                    })
                }
            ]
        }
    }

    decode (args) {
        try {
            const dict = JSON.parse(args.DATA);
            if (typeof dict === 'object' && dict) {
                this.dict = dict;
            } else {
                this.dict = {};
            }
        } catch (e) {
            this.dict = {};
        }
    }

    json () {
        try {
            return JSON.stringify(this.dict);
        } catch (e) {
            return `{${formatMessage({
                id: 'dictionary.default',
                default: '"one":"thing"'
            })}}`;
        }
    }

    get (args) {
        if (!this.dict) {
            return '';
        }
        return this.dict[args.KEY] || '';
    }

    set (args) {
        if (this.dict) {
            this.dict[args.KEY] = args.VALUE;
        }
    }

    remove (args) {
        if (this.dict) {
            delete this.dict[args.KEY];
        }
    }

    clear (args) {
        this.dict = {};
    }
}

formatMessage.setup({
    translations: {
        en: {
            name: 'Dictionary Type',
            'dictionary.key': 'one',
            'dictionary.value': 'thing',
            'dictionary.default': '"one":"thing"',
            'dictionary.decode': 'decode JSON format [DATA]',
            'dictionary.json': 'dictionary in JSON format',
            'dictionary.get': 'entry [KEY] of dictionary',
            'dictionary.set': 'store [VALUE] with entry [KEY] to dictionary',
            'dictionary.remove': 'delete [KEY] of dictionary',
            'dictionary.clear': 'delete all of dictionary'
        },
        'zh-cn': {
            name: '字典类型',
            'dictionary.key': '一个',
            'dictionary.value': '东西',
            'dictionary.default': '"一个":"东西"',
            'dictionary.decode': '将 JSON 格式 [DATA] 解析为字典',
            'dictionary.json': 'JSON 格式字典',
            'dictionary.get': '名字为[KEY]的项目',
            'dictionary.set': '用[KEY]名字将[VALUE]存入字典',
            'dictionary.remove': '删除名字为[KEY]的项目',
            'dictionary.clear': '删除全部项目'
        }
    }
})

Scratch.extensions.register(new DictionaryBlocks());
