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
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAJjElEQVR4nO3Ze3BU1R0H8O+5z81uspu7ybIJeYdFSYK8Yie0FibBDBmwA50EGcwo1vEtRqWtrXSGaRyL1pbpdFBLq1gNBesDtRmLAwwiFUzTykuMEA3kQR6QTXazm+xu9t69957+odBOSSS7RmM75zNzZ2funHPu7/z27DnnngUYhmEYhmEYhmEYhmEYhmEYhmEYhmEYhmEY5v8TGetmPa0Xug6piu+TAa6/xYuhs11CNKxmJFmTstRwlIv4Qhj1jcBQDSSlpcCalgxZsVI9ovbHIPZkz3XF3AUFcBRl09RCZ/CpmQ+oX3fHLqpr22IPfHTO0ne6l1w4cYYMtF+wJaenF5i6nqyNRJCUYoUgi9GwL3DWkZs2kjHTQ+3XZlFHQZb2wryHgoQQ+kXtX5bA5Ixkl6nhXUppsaEbxIwZMGMGTMOcUMCEI+BEHrwogBd5EJ7vzphbWNP+zokPEsxB3NKuclcaqnmfFlHzqGmWmLopmzEdxud9GTtwgON58CIPTuTBCbxOOHJKSJI6CcFTwXO+dwB8YTIBALJVXvF5wUm7Mubl/zHxdMTHs6zMLsjix5PaB4L9AKSxnif89420orT9QlLKFl4WyyODw0LoQoDEIprAS4KdALJpmALhOKsWinKmbkB2WAGCKAFRQaAaqh4ULKKe7E6lVpdd06Pae8p8d/2FE52Tmqjx3Fy2LPR778DT+qh656h32KJrusTLQirVKW/EDAJQCQRJhqbDUHXwsgBBEkEpjVJQVRBFSgRiGKoeJAKv2lwpBhH4lwc/7tHHet6YcyAoJfWdL8p9ssYBQPjEecHf22Mf7fVatJBhKVrznQ3vP95Y2/fBWax69cGBYMfA7T3HO1pTsp2qkpkZtFydrie57FQOq8ZUzX91bVvkQEQVjG6f5O++4Ah+6hcCbf2Es4nWa9ddv3nobH/l2/c8j+t/VYvp3ypoOrmz6YdDXV6/e2YudVzl1J05GUE+J01Ld/Lmb7LXR680F05Yfvm8VOs0exsvCZRwhFoUm16yeuGtk9L418SzfP4258wMSjhClUI3LV61cFOibXHxVkjOsMyLeIc9VZVLccftd4BETR4c9z3QcUbzN9Bw1+BC4o9h5YqVkMJAzz/OLEi0rcvmwCtWsCXZAKC6uhpLlizB66+/Dk7g4m7norrmervfH7EbvDjBL2AUArXoHlkaqK+oH3NeuhIi8pLH48HOnTuxYsUKHGk7ySfSDpBAAnk+4WddUnpXqdj3YWCO5g//7Lnlv66iOrXFHYfEt6fNynrZlm57/tyhTzqQwBxFCAEhX+6Hk/DI+U8cz4mfrfhXDqaeviptuerBJ4NdA3d5CmZY1956E9xud1wdMQwDra2thW+99daGvi7v7fmVc37eCfxhovUJhy8/Cj43KQnkRaF0/p2VNefn5vkivhE5JTO1AIQ4o0MREh2O2CSbZTYnkEw1pApPOm+bRqNGZt1992Pjxo1wOp2XtWeaJnp7exEMBpGVlQVFUS4rQynFmTNnyN133+1+v7npGVdJzo/MmNEVDYRPyI6k4STFZvKiEA70+NqkZDmSnKlQa7rDyCsvcn/U8J4bE3svmHyld1XeAIBu27aNtre3U6fTSTmeoxzPGYQjOgjRQQgFAQUhVFEUWlRURCsqKujSpUspz/N07dq11DAMOp6GhgbqdDqpLMs0NzeXHj16dNyyfr+fejweKssynTVrFk1LS6Mcx116PiHEIITohCMxwnMxXhIMTuBoWVkZjUQitLKykjpyXfsSzcekjMDly5ZjzZo1XGpqKux2OxwOx6VPSZIgCAJ4nseePXtw4MABrF69Ghw39gbg2LFjeLDuASwZNnEdUvH0ufNYv3499u7dC4vFcll5RVFQW1uLTZs24Y033kBeXh5UVcXIyAiCwSCGh4e5YDCIi1cgEMDWrVsno9sAJimBPp8Pfr8fbrcb2dnZsNlssFgskCQJkiRdSlZ/fz9M00R+fv64bTU3N4MMh/A4KcAMIsNmcvjxsWPw+/2YPn36mHU8Hg9M00QoFILVaoXVaoWiKIjFYtA0DaqqYnR0FAMDA2htbYUgTEq3ASSQQFOPXTZ7HD99Eh88fATEBERRhMPhgKIoSE9PR0ZGBjweD2bPno3e3l4AwODg4LjtFxYWIsIDfzaDuI5asRV+5OV54HA4xq3j9XpBKYXX68W+fftw+vRpnDp1Ct3d3fB6vfD7/QgEAohEItB1HSalcLlc8XZ9THEnMNDn6yWEIBKJIBqNwjRNzLllUfM1a77707PvfZTTf7yzcNQ7PKP/fCC769M+B2k7mWHufztF13S7EdWJaZrYvXs3Fi9ePObKW1FRgZtuuQW/fuUVPKH6kZGThd8+9hhstrF3OuFwGI2NjQCAVatWQacGRJuscyIfFCzSCIDzKdOVYHpxfpurJLt/VvW1mft/8vJteli3GoYBTdMAQsc5ormyuDdBy+qWyQe2/+2UXbIVOhwOnG1vx4I7yquOPnvg0kRMKSWPHnyUP9jZKcQOtYm+oZg0Y9ncq6lhLP74paYNg8e67Q0NDaiurh4ziZqmoaOjA6FQCHl5eUhLSxuznKqqWLduHbbv+BOKb/p2v1Lg2mHNVA5SU2//5J2TvbklhYaruETDjcXGa2S1cTE29zU524fPDN5cXl6OgwcPwrUg5xfdTW0b480FkEACAWD290tn9HzY/Uuqm+nJ2c4X7myq3VFP6ie0Maj96yOFe9a/+NJoT7CspqYGixYtQmpqalz7wIvbnN27d+Pw399HZlnhjhueuf/e35WsC02kfukPyme1Hz79RNQfniE7rMeLa657uGnzm94JBzDVag89ohStKtsr2SwGIYSKohjXxfM8JRyhKdOdI2UPLd9QT+vjfqefLFN2AHDvySeUv9z23GGLnxZv3rwZsixPuO6uXbvw2ttvouaVunsKy4XnJjr6vwqTt57HaZBXw7FQ1D/N7kJVVdW4i8RYWlpaQPYSyEry4XryyJQlD0jgOGuyKKN9lJqJr36fMWOTE03ipiyBz5Y+q5uG0To0NIRAIDDhepqm4ciRI+BFfsiw8Oe/whAnZEoPQefcvHDBqV1Hm2cWeMSVK1dCFMUr1mlpaUFjYyOmzc976sLRjge+hjC/0JSfIhdWzakZaOleFwupKSb97EiP6gZiEQ0AQHgC0fbvd2Be4EcdOenvps6dtqV1+z99UxL0NwzBjeCBOK7/ob8PGIZhGIZhGIZhGIZhGIZhGIZhGIZhGIZhEvcvZxVMkMURtN4AAAAASUVORK5CYII=';

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

        this.stop = this.stop.bind(this)
        this.runtime.on(this.runtime.constructor.PROJECT_STOP_ALL, this.stop);
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
