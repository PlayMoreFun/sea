// We use class syntax to define our extension object
// This isn't actually necessary, but it tends to look the best

formatMessage.setup({
    translations: {
        en: {
            name: 'Hello',
            'block.hello.text': 'Hello, [ONE]!',
            'block.hello.value': 'world',
            'block.hello.opcode': 'Hello, {ONE}!',
        },
        'zh-cn': {
            name: '你好',
            'block.hello.text': '你好，[ONE]！',
            'block.hello.value': '世界',
            'block.hello.opcode': '你好，{ONE}！',
        }
    }
});

class HelloExtension {
    /**
     * Scratch will call this method *once* when the extension loads.
     * This method's job is to tell Scratch things like the extension's ID, name, and what blocks it supports.
     */
    getInfo (locale) {
        formatMessage.setup({locale});

        return {
            // `id` is the internal ID of the extension
            // It should never change!
            // If you choose to make an actual extension, please change this to something else.
            // Only the characters a-z and 0-9 can be used. No spaces or special characters.
            // The same name as the folder.
            id: 'hello',

            // `name` is what the user sees in the toolbox
            // It can be changed without breaking projects.
            name: formatMessage({
                id: 'name',
                defaultValue: 'Hello'
            }),

            blocks: [
                {
                    // `opcode` is the internal ID of the block
                    // It should never change!
                    // It corresponds to the class method with the same name.
                    opcode: 'hello',
                    // `blockType` defines the type of block.
                    //  Scratch.BlockType.REPORTER makes a round reporter
                    //  Scratch.BlockType.BOOLEAN makes a triangle shaped reporter that can fit into boolean inputs
                    //  Scratch.BlockType.COMMAND makes a stacked block
                    blockType: Scratch.BlockType.REPORTER,
                    text: formatMessage({
                        id: 'block.hello.text',
                        defaultValue: 'Hello, [ONE]'
                    }),
                    arguments: {
                        ONE: {
                            // `type` which defines the input shape to make.
                            // Note that regardless of the type set here, the values actually passed to the block are not guaranteed to be casted to the right type.
                            // You should manually convert arguments to numbers, for example, as they will often be passed as strings.
                            //  Scratch.ArgumentType.STRING for string inputs
                            //  Scratch.ArgumentType.NUMBER for number inputs
                            //  Scratch.ArgumentType.BOOLEAN for boolean inputs (defaultValue is ignored)
                            //  Scratch.ArgumentType.ANGLE for angles
                            //  Scratch.ArgumentType.COLOR for colors (#123abc string format)
                            //  Scratch.ArgumentType.MATRIX for a 5x5 matrix (passed in 11101010101... string format)
                            //  Scratch.ArgumentType.NOTE for music notes
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'block.hello.value',
                                defaultValue: 'value'
                            }),
                        }
                    }
                },
            ]
        };
    }

    /**
     * Corresponds to `opcode: 'hello'` above
     */
    hello (args) {
        // You can just return a value: any string, boolean, or number will work.
        // If you have to perform an asynchronous action like a request, just return a Promise.
        // The block will wait until the Promise resolves and return the resolved value.
        return formatMessage({
            id: 'block.hello.opcode',
            defaultValue: 'Hello, {ONE}!'
        }, args);
    }
  }

  // Call Scratch.extensions.register to register your extension
  // Make sure to register each extension exactly once
  Scratch.extensions.register(new HelloExtension());
