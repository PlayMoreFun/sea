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
const blockIconURI = 'data:@file/png;base64,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';

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
