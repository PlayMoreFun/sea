// Tello 无人机

const Cast = Util.Cast;
const MathUtil = Util.MathUtil;

const TELLO_SSID = 'TELLO-';
const TELLO_REMOTE = '192.168.10.1';
const TELLO_LOCAL = '0.0.0.0';
const TELLO_COMMAND_PORT = 8889;
const TELLO_STATE_PORT = 8890;
const TELLO_VIDEO_PORT = 11111;

// eslint-disable-next-line max-len
const menuIconURI = 'data:image/png;base64,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';
const blockIconURI = 'data:image/png;base64,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';

class Tello {
    constructor (runtime, extensionId) {
        this._runtime = runtime;
        this._udp = null;
        this._runtime.registerPeripheralExtension(extensionId, this);
        this._extensionId = extensionId;

        this._udp = new Scratch.UDP(this._runtime, this._extensionId, {}, this.onConnect);
    }

    async command (message) {
        return await this._udp.sendMessage({
            host: TELLO_REMOTE,
            port: TELLO_COMMAND_PORT,
            message
        });
    }

    onConnect () {
        return this.command('command');
    }
}

class TelloBlocks {
    constructor (runtime) {
        this.runtime = runtime;
        this._peripheral = new Tello(this.runtime, TelloBlocks.EXTENSION_ID);
    }

    static get EXTENSION_ID () {
        return 'tello';
    }

    getInfo (locale) {
        formatMessage.setup({locale});

        return {
            id: TelloBlocks.EXTENSION_ID,
            name: 'Tello',
            // showStatusButton: 'wifi',
            blockIconURI,
            menuIconURI,
            blocks: [
                {
                    opcode: 'takeoff',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.takeoff',
                        default: 'auto take off'
                    })
                },
                {
                    opcode: 'land',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.land',
                        default: 'auto landing'
                    })
                },
                {
                    opcode: 'motoron',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.motoron',
                        default: '[w] motor-on mode'
                    }),
                    arguments: {
                        w: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'motoron'
                        }
                    }
                },
                '---',
                {
                    opcode: 'stop',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.stop',
                        default: 'stop moving and hover'
                    })
                },
                {
                    opcode: 'fly',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.fly',
                        default: 'fly [d] [x] cm'
                    }),
                    arguments: {
                        d: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'flying',
                        },
                        x: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 20
                        }
                    }
                },
                {
                    opcode: 'cw',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.cw',
                        default: 'rotate clockwise [x] degrees'
                    }),
                    arguments: {
                        x: {
                            type: Scratch.ArgumentType.ANGLE,
                            defaultValue: 15
                        }
                    }
                },
                {
                    opcode: 'ccw',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.ccw',
                        default: 'rotate counterclockwise [x] degrees'
                    }),
                    arguments: {
                        x: {
                            type: Scratch.ArgumentType.ANGLE,
                            defaultValue: 15
                        }
                    }
                },
                {
                    opcode: 'flip',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.flip',
                        default: 'roll in the [d] direction'
                    }),
                    arguments: {
                        d: {
                            type: Scratch.ArgumentType.STRING,
                            menu: 'flipping'
                        }
                    }
                },
                {
                    opcode: 'go',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.go',
                        default: 'fly to x: [x] y: [y] z: [z] by [speed] cm/s'
                    }),
                    arguments: {
                        x: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 20
                        },
                        y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 20
                        },
                        z: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 20
                        },
                        speed: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'curve',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.curve',
                        default: 'fly in a curve from x1: [x1] y1: [y1] z1: [z1] to x2: [x2] y2: [y2] z2: [z2] by [speed] cm/s'
                    }),
                    arguments: {
                        x1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: -20
                        },
                        y1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: -20
                        },
                        z1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: -20
                        },
                        x2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 20
                        },
                        y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 20
                        },
                        z2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 20
                        },
                        speed: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'speed',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.speed',
                        default: 'set speed to [x] cm/s'
                    }),
                    arguments: {
                        x: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                },
                {
                    opcode: 'readspeed',
                    blockType: Scratch.BlockType.REPORTER,
                    text: formatMessage({
                        id: 'block.speed?',
                        default: 'speed (cm/s)'
                    })
                },
                '---',
                {
                    opcode: 'command',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.command',
                        default: 'initialize tello'
                    })
                },
                {
                    opcode: 'throwfly',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.throwfly',
                        default: 'throw to launch'
                    })
                },
                {
                    opcode: 'emergency',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.emergency',
                        default: 'stop all motors'
                    })
                },
                {
                    opcode: 'reboot',
                    blockType: Scratch.BlockType.COMMAND,
                    text: formatMessage({
                        id: 'block.reboot',
                        default: 'reboot the Tello'
                    })
                },
                '---',
                {
                    opcode: 'readbattery',
                    blockType: Scratch.BlockType.REPORTER,
                    text: formatMessage({
                        id: 'block.battery?',
                        default: 'battery level (%)'
                    })
                },
                {
                    opcode: 'readtime',
                    blockType: Scratch.BlockType.REPORTER,
                    text: formatMessage({
                        id: 'block.time?',
                        default: 'motor running time (s)'
                    })
                },
            ],
            menus: {
                flying: [
                    {
                        text: formatMessage({
                            id: 'block.fly.up',
                            default: 'Upward',
                        }),
                        value: 'up'
                    },
                    {
                        text: formatMessage({
                            id: 'block.fly.down',
                            default: 'Downtward',
                        }),
                        value: 'down'
                    },
                    {
                        text: formatMessage({
                            id: 'block.fly.left',
                            default: 'Leftward',
                        }),
                        value: 'left'
                    },
                    {
                        text: formatMessage({
                            id: 'block.fly.right',
                            default: 'Rightwardward',
                        }),
                        value: 'right'
                    },
                    {
                        text: formatMessage({
                            id: 'block.fly.forward',
                            default: 'Forward',
                        }),
                        value: 'forward'
                    },
                    {
                        text: formatMessage({
                            id: 'block.fly.back',
                            default: 'Back',
                        }),
                        value: 'back'
                    }
                ],
                motoron: [
                    {
                        text: formatMessage({
                            id: 'block.motoron.enter',
                            default: 'Enter'
                        }),
                        value: 'motoron'
                    },
                    {
                        text: formatMessage({
                            id: 'block.motoron.exit',
                            default: 'Exit'
                        }),
                        value: 'motoroff'
                    }
                ],
                flipping: [
                    {
                        text: formatMessage({
                            id: 'block.flip.left',
                            default: 'Left',
                        }),
                        value: 'l'
                    },
                    {
                        text: formatMessage({
                            id: 'block.flip.right',
                            default: 'Right',
                        }),
                        value: 'r'
                    },
                    {
                        text: formatMessage({
                            id: 'block.flip.forward',
                            default: 'Forward',
                        }),
                        value: 'f'
                    },
                    {
                        text: formatMessage({
                            id: 'block.flip.back',
                            default: 'Back',
                        }),
                        value: 'b'
                    }
                ]
            },
        };
    }

    command () {
        return this._peripheral.command('command');
    }

    takeoff () {
        return this._peripheral.command('takeoff');
    }

    land () {
        return this._peripheral.command('land');
    }

    motoron (args) {
        return this._peripheral.command(`${args.w}`);
    }

    stop () {
        return this._peripheral.command('stop');
    }

    fly (args) {
        const x = MathUtil.clamp(Cast.toNumber(args.x), 20, 500);
        return this._peripheral.command(`${args.d} ${x}`);
    }

    cw (args) {
        const x = Cast.toNumber(args.x) % 360;
        if (x < 0) {
            return this._peripheral.command(`ccw ${Math.abs(x)}`);
        } else {
            return this._peripheral.command(`cw ${x}`);
        }
    }

    ccw (args) {
        const x = Cast.toNumber(args.x) % 360;
        if (x < 0) {
            return this._peripheral.command(`cw ${Math.abs(x)}`);
        } else {
            return this._peripheral.command(`ccw ${x}`);
        }
    }

    flip (args) {
        return this._peripheral.command(`flip ${args.d}`);
    }

    go (args) {
        const x = MathUtil.clamp(Cast.toNumber(args.x), -500, 500);
        const y = MathUtil.clamp(Cast.toNumber(args.y), -500, 500);
        const z = MathUtil.clamp(Cast.toNumber(args.z), -500, 500);
        const speed = MathUtil.clamp(Cast.toNumber(args.speed), 10, 100);
        return this._peripheral.command(`go ${x} ${y} ${z} ${speed}`);
    }

    curve (args) {
        const x1 = MathUtil.clamp(Cast.toNumber(args.x1), -500, 500);
        const y1 = MathUtil.clamp(Cast.toNumber(args.y1), -500, 500);
        const z1 = MathUtil.clamp(Cast.toNumber(args.z1), -500, 500);
        const x2 = MathUtil.clamp(Cast.toNumber(args.x2), -500, 500);
        const y2 = MathUtil.clamp(Cast.toNumber(args.y2), -500, 500);
        const z2 = MathUtil.clamp(Cast.toNumber(args.z2), -500, 500);
        const speed = MathUtil.clamp(Cast.toNumber(args.speed), 10, 100);
        return this._peripheral.command(`curve ${x1} ${y1} ${z1} ${x2} ${y2} ${z2} ${speed}`);
    }

    speed (args) {
        const x = MathUtil.clamp(Cast.toNumber(args.x), 10, 100);
        return this._peripheral.command(`speed ${x}`);
    }

    throwfly () {
        return this._peripheral.command('throwfly');
    }

    emergency () {
        return this._peripheral.command('emergency');
    }

    reboot () {
        return this._peripheral.command('reboot');
    }

    readspeed () {
        return this._readNumber('speed');
    }

    readbattery () {
        return this._readNumber('battery?');
    }

    readtime () {
        return this._readNumber('time?');
    }

    async _readNumber (command) {
        return Cast.toNumber(await this._peripheral.command(command));
    }
}

formatMessage.setup({
    translations: {
        en: {
            'block.command': 'initialize the Tello',
            'block.takeoff': 'auto take off',
            'block.land': 'auto landing',
            'block.streamon': 'turn on the video stream',
            'block.streamoff': 'turn off the video stream',
            'block.emergency': 'stop all motors',
            'block.fly': 'fly [d] [x] cm',
            'block.fly.up': 'upward',
            'block.fly.down': 'downward',
            'block.fly.left': 'leftward',
            'block.fly.right': 'rightward',
            'block.fly.forward': 'forward',
            'block.fly.back': 'backward',
            'block.cw': 'rotate clockwise [x] degrees',
            'block.ccw': 'rotate counterclockwise [x] degrees',
            'block.motoron': '[w] motor-on mode',
            'block.motoron.enter': 'enter',
            'block.motoron.exit': 'exit',
            'block.throwfly': 'throw to launch',
            'block.flip': 'roll in the [d] direction',
            'block.flip.left': 'left',
            'block.flip.right': 'right',
            'block.flip.forward': 'forward',
            'block.flip.back': 'back',
            'block.go': 'fly to x: [x] y: [y] z: [z] by [speed] cm/s',
            'block.stop': 'stop moving and hover',
            'block.curve': 'fly in a curve from x1: [x1] y1: [y1] z1: [z1] to x2: [x2] y2: [y2] z2: [z2] by [speed] cm/s',
            'block.reboot': 'reboot the Tello',
            'block.speed': 'set speed to [x] cm/s',
            'block.speed?': 'speed (cm/s)',
            'block.battery?': 'battery level (%)',
            'block.time?': 'motor running time (s)'
        },
        'zh-cn': {
            'block.command': '初始化无人机',
            'block.takeoff': '自动起飞',
            'block.land': '自动降落',
            'block.streamon': '打开视频流',
            'block.streamoff': '关闭视频流',
            'block.emergency': '停止电机转动',
            'block.fly': '向[d]飞[x]厘米',
            'block.fly.up': '上',
            'block.fly.down': '下',
            'block.fly.left': '左',
            'block.fly.right': '右',
            'block.fly.forward': '前',
            'block.fly.back': '后',
            'block.cw': '顺时针旋转[x]度',
            'block.ccw': '逆时针旋转[x]度',
            'block.motoron': '[w]起桨模式',
            'block.motoron.enter': '进入',
            'block.motoron.exit': '退出',
            'block.throwfly': '抛飞',
            'block.flip': '朝[d]方向翻滚',
            'block.flip.left': '左',
            'block.flip.right': '右',
            'block.flip.forward': '前',
            'block.flip.back': '后',
            'block.go': '每秒[speed]厘米飞到 x: [x] y: [y] z: [z]',
            'block.stop': '停止运动并悬停',
            'block.curve': '每秒[speed]厘米弧线飞过 x1: [x1] y1: [y1] z1: [z1] 到 x2: [x2] y2: [y2] z2: [z2]',
            'block.reboot': '重启无人机',
            'block.speed': '将飞行速度设为每秒[x]厘米',
            'block.speed?': '飞行速度 (cm/s)',
            'block.battery?': '电量 (%)',
            'block.time?': '电机运转时间 (s)'
        }
    }
});

Scratch.extensions.register(TelloBlocks);
