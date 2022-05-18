// 修改自 Scratch 3 内建的 Boost 扩展
// 参考 https://github.com/bricklife/scratch-lego-bluetooth-extensions/tree/master/scratch-vm/src/extensions/scratch3_legomario

const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const BLE = Scratch.BLE;
const Base64Util = Util.Base64Util;
const MathUtil = Util.MathUtil;
const RateLimiter = Util.RateLimiter;
const Cast = Util.Cast;

const blockIconURI = 'data:image/png;base64,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';

const BLETimeout = 4500;
const BLEDataStoppedError = 'lego mario extension stopped receiving data';

const MarioBLE = {
    service: '00001623-1212-efde-1623-785feabcd123',
    characteristic: '00001624-1212-efde-1623-785feabcd123',
    sendRateMax: 20,
    mario: 0x43,
    luigi: 0x44,
};

const MarioIO = {
    COLOR_BARCODE_SENSOR: 0x49,
    PANTS: 0x4a,
};

const MessageType = {
    HUB_PROPERTIES: 0x01,
    HUB_ACTIONS: 0x02,
    HUB_ALERTS: 0x03,
    HUB_ATTACHED_IO: 0x04,
    ERROR: 0x05,
    PORT_INPUT_FORMAT_SETUP_SINGLE: 0x41,
    PORT_INPUT_FORMAT_SETUP_COMBINED: 0x42,
    PORT_INFORMATION: 0x43,
    PORT_MODEINFORMATION: 0x44,
    PORT_VALUE: 0x45,
    PORT_VALUE_COMBINED: 0x46,
    PORT_INPUT_FORMAT: 0x47,
    PORT_INPUT_FORMAT_COMBINED: 0x48,
    OUTPUT: 0x81,
    PORT_FEEDBACK: 0x82
};

const PropertyType = {
    ADVERTISEMENT_NAME: 0x01,
    BUTTON: 0x02,
    FW_VERSION: 0x03,
    HW_VERSION: 0x04,
    RSSI: 0x05,
    BATTERY_VOLTAGE: 0x06,
    BATTERY_TYPE: 0x07,
    MANUFACTURER_NAME: 0x08,
    RADIO_FW_VERSION: 0x09,
    LEGO_WP_VERSION: 0x0A,
    SYSTEM_TYPE_ID: 0x0B,
    HW_NETWORK_ID: 0x0C,
    PRIMARY_MAC: 0x0D,
    SECONDARY_MAC: 0x0E,
    HW_NETWORK_FAMILY: 0x0F
};

const PropertyOperation = {
    SET: 0x01,
    ENABLE_UPDATES: 0x02,
    DISABLE_UPDATES: 0x03,
    RESET: 0x04,
    REQUEST_UPDATE: 0x05,
    UPDATE: 0x06
};

const IOEvent = {
    ATTACHED: 0x01,
    DETACHED: 0x00,
    ATTACHED_VIRTUAL: 0x02
};

const MarioMode = {
    COLOR: 0,
    PANTS: 0,
    UNKNOWN: 0 // Anything else will use the default mode (mode 0)
};

const MarioColor = {
    WHITE: 0x0013,
    RED: 0x0015,
    BLUE: 0x0017,
    YELLOW: 0x0018,
    BLACK: 0x001a,
    GREEN: 0x0025,
    BROWN: 0x006a,
    PURPLE: 0x010c,
    NOUGAT_BROWN: 0x0138,
    CYAN: 0x0142,
    NONE: -1,
};

const MarioPants = {
    NONE: 0x00,
    BEE: 0x03,
    LUIGI: 0x05,
    FROG: 0x06,
    TANOOKI: 0x0a,
    PROPELLER: 0x0c,
    CAT: 0x11,
    FIRE: 0x12,
    PENGUIN: 0x14,
    MARIO: 0x21,
    BUILDER: 0x22,
};

const numberToInt32Array = (number) => {
    const buffer = new ArrayBuffer(4);
    const dataview = new DataView(buffer);
    dataview.setInt32(0, number);
    return [
        dataview.getInt8(3),
        dataview.getInt8(2),
        dataview.getInt8(1),
        dataview.getInt8(0)
    ];
};

class LEGOMario {
    constructor (runtime, extensionId) {
        this._runtime = runtime;
        this._extensionId = extensionId;

        this._ports = [];
        this._sensors = {
            barcode: MarioColor.NONE,
            color: MarioColor.NONE,
            pants: MarioPants.NONE,
        }

        this._ble = null;
        this._runtime.registerPeripheralExtension(extensionId, this);
        this._timeoutID = null;

        this._rateLimiter = new RateLimiter(MarioBLE.sendRateMax);

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
    }

    get barcode () {
        return this._sensors.barcode;
    }

    get color () {
        return this._sensors.color;
    }

    get pants () {
        return this._sensors.pants;
    }

    scan () {
        if (this._ble) {
            this._ble.disconnect();
        }
        const createFilter = prefix => ({
            services: [MarioBLE.service],
            manufacturerData: {
                0x0397: {
                    dataPrefix: [0x00, prefix],
                    mask: [0x00, 0xFF]
                }
            }
        });
        this._ble = new BLE(this._runtime, this._extensionId, {
            filters: [
                createFilter(MarioBLE.mario),
                createFilter(MarioBLE.luigi),
            ],
            optionalServices: []
        }, this._onConnect, this.reset);
    }

    connect(id) {
        if (this._ble) {
            this._ble.connectPeripheral(id);
        }
    }

    disconnect() {
        if (this._ble) {
            this._ble.disconnect();
        }
        this.reset();
    }

    reset () {
        this._timeoutID = null;
        this._ports = [];
        this._sensors = {
            barcode: MarioColor.NONE,
            color: MarioColor.NONE,
            pants: MarioPants.NONE,
        };
    }

    isConnected() {
        let connected = false;
        if (this._ble) {
            connected = this._ble.isConnected();
        }
        return connected;
    }

    send (uuid, message, useLimiter = true) {
        if (!this.isConnected()) {
            return Promise.resolve();
        }

        if (useLimiter) {
            if (!this._rateLimiter.okayToSend()) {
                return Promise.resolve();
            }
        }

        return this._ble.write(
            MarioBLE.service,
            uuid,
            Base64Util.uint8ArrayToBase64(message),
            'base64'
        );
    }

    generateInputCommand (portID, mode, delta, enableNotifications) {
        const command = [
            0x00, // Hub ID
            MessageType.PORT_INPUT_FORMAT_SETUP_SINGLE,
            portID,
            mode
        ].concat(numberToInt32Array(delta)).concat([
            enableNotifications
        ]);
        command.unshift(command.length + 1); // Prepend payload with length byte;

        return command;
    }

    _onConnect() {
        this._ble.startNotifications(
            MarioBLE.service,
            MarioBLE.characteristic,
            this._onMessage
        );

        setTimeout(() => {
            const command = [
                0x00, // Hub ID
                MessageType.HUB_PROPERTIES,
                PropertyType.FW_VERSION,
                PropertyOperation.REQUEST_UPDATE
            ];
            command.unshift(command.length + 1);
            this.send(MarioBLE.characteristic, command, false);
        }, 500);

        this._timeoutID = window.setTimeout(
            () => this._ble.handleDisconnectError(BLEDataStoppedError),
            BLETimeout
        );
    }

    _onMessage(base64) {
        const data = Base64Util.base64ToUint8Array(base64);
        /**
         * First three bytes are the common header:
         * 0: Length of message
         * 1: Hub ID (always 0x00 at the moment, unused)
         * 2: Message Type
         * 3: Port ID
         * We base our switch-case on Message Type
         */
        const messageType = data[2];
        const portID = data[3];

        switch (messageType) {
            case MessageType.HUB_ATTACHED_IO: { // IO Attach/Detach events
                const event = data[4];
                const typeId = data[5];

                switch (event) {
                    case IOEvent.ATTACHED:
                        this._registerSensor(portID, typeId);
                        break;
                    case IOEvent.DETACHED:
                        this._clearPort(portID);
                        break;
                    case IOEvent.ATTACHED_VIRTUAL:
                    default:
                }
                break;
            }

            case MessageType.PORT_VALUE: {
                const type = this._ports[portID];
                const buffer = Buffer.from(data.slice(4));
                switch (type) {
                    case MarioIO.COLOR_BARCODE_SENSOR:
                        this._sensors.barcode = buffer.readInt16LE(0);
                        this._sensors.color = buffer.readInt16LE(2);
                        break;
                    case MarioIO.PANTS:
                        this._sensors.pants = buffer.readInt8(0);
                        break;
                    default:
                        // log.warn(`Unknown sensor value! Type: ${type}`);
                }
                break;
            }

            case MessageType.ERROR:
                log.error(`Error reported by hub: ${data}`);
                break;
        }

        // cancel disconnect timeout and start a new one
        window.clearTimeout(this._timeoutID);
        this._timeoutID = window.setTimeout(
            () => this._ble.handleDisconnectError(BLEDataStoppedError),
            BLETimeout
        );
    }

    _registerSensor (portID, type) {
        // Record which port is connected to what type of device
        this._ports[portID] = type;

        // Set input format for tilt or distance sensor
        let mode = null;
        let delta = 1;

        switch (type) {
            case MarioIO.COLOR_BARCODE_SENSOR:
                mode = MarioMode.COLOR;
                delta = 0;
                break;
            case MarioIO.PANTS:
                mode = MarioMode.PANTS;
                delta = 0;
                break;
            default:
                mode = MarioMode.UNKNOWN;
        }

        const cmd = this.generateInputCommand(
            portID,
            mode,
            delta,
            true // Receive feedback
        );
        this.send(MarioBLE.characteristic, cmd);
    }

    _clearPort (portID) {
        const type = this._ports[portID];
        if (type === MarioIO.COLOR_BARCODE_SENSOR) {
            this._sensors.barcode = MarioColor.NONE;
            this._sensors.color = MarioColor.NONE;
        }
        if (type === MarioIO.PANTS) {
            this._sensors.pants = MarioPants.NONE;
        }
        this._ports[portID] = 'none';
    }
}

class LEGOMarioBlocks {
    constructor(runtime) {
        this.runtime = runtime;
        this._peripheral = new LEGOMario(this.runtime, LEGOMarioBlocks.EXTENSION_ID);
    }

    static get EXTENSION_ID () {
        return 'legomario'
    }

    static get ColorLabel () {
        return {
            [MarioColor.WHITE]: formatMessage({
                id: 'legomario.color.white',
                default: 'White'
            }),
            [MarioColor.RED]: formatMessage({
                id: 'legomario.color.red',
                default: 'Red'
            }),
            [MarioColor.BLUE]: formatMessage({
                id: 'legomario.color.blue',
                default: 'Blue'
            }),
            [MarioColor.YELLOW]: formatMessage({
                id: 'legomario.color.yellow',
                default: 'Yellow'
            }),
            [MarioColor.BLACK]: formatMessage({
                id: 'legomario.color.black',
                default: 'Black'
            }),
            [MarioColor.GREEN]: formatMessage({
                id: 'legomario.color.green',
                default: 'Green'
            }),
            [MarioColor.BROWN]: formatMessage({
                id: 'legomario.color.brown',
                default: 'Brown'
            }),
            [MarioColor.PURPLE]: formatMessage({
                id: 'legomario.color.purple',
                default: 'Purple'
            }),
            [MarioColor.NOUGAT_BROWN]: formatMessage({
                id: 'legomario.color.nougatBrown',
                default: 'Nougat Brown'
            }),
            [MarioColor.CYAN]: formatMessage({
                id: 'legomario.color.cyan',
                default: 'Cyan'
            }),
            [MarioColor.NONE]: formatMessage({
                id: 'legomario.color.noColor',
                default: 'No color'
            })
        };
    }

    static get PantsLabel () {
        return {
            [MarioPants.NONE]: formatMessage({
                id: 'legomario.pants.none',
                default: 'None'
            }),
            [MarioPants.BEE]: formatMessage({
                id: 'legomario.pants.bee',
                default: 'Bee'
            }),
            [MarioPants.LUIGI]: formatMessage({
                id: 'legomario.pants.luigi',
                default: 'Luigi'
            }),
            [MarioPants.FROG]: formatMessage({
                id: 'legomario.pants.frog',
                default: 'Frog'
            }),
            [MarioPants.TANOOKI]: formatMessage({
                id: 'legomario.pants.tanooki',
                default: 'Tanooki'
            }),
            [MarioPants.PROPELLER]: formatMessage({
                id: 'legomario.pants.propeller',
                default: 'Propeller'
            }),
            [MarioPants.CAT]: formatMessage({
                id: 'legomario.pants.cat',
                default: 'Cat'
            }),
            [MarioPants.FIRE]: formatMessage({
                id: 'legomario.pants.fire',
                default: 'Fire'
            }),
            [MarioPants.PENGUIN]: formatMessage({
                id: 'legomario.pants.penguin',
                default: 'Penguin'
            }),
            [MarioPants.MARIO]: formatMessage({
                id: 'legomario.pants.mario',
                default: 'Mario'
            }),
            [MarioPants.BUILDER]: formatMessage({
                id: 'legomario.pants.builder',
                default: 'Builder'
            })
        };
    }

    static get BLOCKS () {
        return [
            {
                opcode: 'whenBarcode',
                text: formatMessage({
                    id: 'legomario.whenBarcode',
                    default: 'when barcode is [BARCODE]'
                }),
                blockType: BlockType.HAT,
                arguments: {
                    BARCODE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 2
                    }
                }
            },
            {
                opcode: 'whenAnyBarcode',
                text: formatMessage({
                    id: 'legomario.whenAnyBarcode',
                    default: 'when any barcode is found'
                }),
                blockType: BlockType.HAT
            },
            {
                opcode: 'getBarcode',
                text: formatMessage({
                    id: 'legomario.getBarcode',
                    default: 'barcode'
                }),
                blockType: BlockType.REPORTER
            },
            '---',
            {
                opcode: 'whenColor',
                text: formatMessage({
                    id: 'legomario.whenColor',
                    default: 'when color is [SENSOR_COLOR]'
                }),
                blockType: BlockType.HAT,
                arguments: {
                    SENSOR_COLOR: {
                        type: ArgumentType.NUMBER,
                        menu: 'SENSOR_COLOR',
                        defaultValue: MarioColor.RED
                    }
                }
            },
            {
                opcode: 'isColor',
                text: formatMessage({
                    id: 'legomario.isColor',
                    default: 'color is [SENSOR_COLOR] ?'
                }),
                blockType: BlockType.BOOLEAN,
                arguments: {
                    SENSOR_COLOR: {
                        type: ArgumentType.NUMBER,
                        menu: 'SENSOR_COLOR',
                        defaultValue: MarioColor.RED
                    }
                }
            },
            {
                opcode: 'getColor',
                text: formatMessage({
                    id: 'legomario.getColor',
                    default: 'color'
                }),
                blockType: BlockType.REPORTER
            },
            '---',
            {
                opcode: 'whenPants',
                text: formatMessage({
                    id: 'legomario.whenPants',
                    default: 'when pants is [PANTS]'
                }),
                blockType: BlockType.HAT,
                arguments: {
                    PANTS: {
                        type: ArgumentType.NUMBER,
                        menu: 'PANTS',
                        defaultValue: MarioPants.FIRE
                    }
                }
            },
            {
                opcode: 'isPants',
                text: formatMessage({
                    id: 'legomario.isPants',
                    default: 'pants is [PANTS] ?'
                }),
                blockType: BlockType.BOOLEAN,
                arguments: {
                    PANTS: {
                        type: ArgumentType.NUMBER,
                        menu: 'PANTS',
                        defaultValue: MarioPants.MARIO
                    }
                }
            },
            {
                opcode: 'getPants',
                text: formatMessage({
                    id: 'legomario.getPants',
                    default: 'pants'
                }),
                blockType: BlockType.REPORTER
            }
        ]
    }

    static get MENUS () {
        return {
            SENSOR_COLOR: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'legomario.color.white',
                            default: 'White'
                        }),
                        value: MarioColor.WHITE
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.red',
                            default: 'Red'
                        }),
                        value: MarioColor.RED
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.blue',
                            default: 'Blue'
                        }),
                        value: MarioColor.BLUE
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.yellow',
                            default: 'Yellow'
                        }),
                        value: MarioColor.YELLOW
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.black',
                            default: 'Black'
                        }),
                        value: MarioColor.BLACK
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.green',
                            default: 'Green'
                        }),
                        value: MarioColor.GREEN
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.brown',
                            default: 'Brown'
                        }),
                        value: MarioColor.BROWN
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.purple',
                            default: 'Purple'
                        }),
                        value: MarioColor.PURPLE
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.nougatBrown',
                            default: 'Nougat Brown'
                        }),
                        value: MarioColor.NOUGAT_BROWN
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.cyan',
                            default: 'Cyan'
                        }),
                        value: MarioColor.CYAN
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.color.noColor',
                            default: 'No color'
                        }),
                        value: MarioColor.NONE
                    },
                ]
            },
            PANTS: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'legomario.pants.none',
                            default: 'None'
                        }),
                        value: MarioPants.NONE
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.bee',
                            default: 'Bee'
                        }),
                        value: MarioPants.BEE
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.luigi',
                            default: 'Luigi'
                        }),
                        value: MarioPants.LUIGI
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.frog',
                            default: 'Frog'
                        }),
                        value: MarioPants.FROG
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.tanooki',
                            default: 'Tanooki'
                        }),
                        value: MarioPants.TANOOKI
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.propeller',
                            default: 'Propeller'
                        }),
                        value: MarioPants.PROPELLER
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.cat',
                            default: 'Cat'
                        }),
                        value: MarioPants.CAT
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.fire',
                            default: 'Fire'
                        }),
                        value: MarioPants.FIRE
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.penguin',
                            default: 'Penguin'
                        }),
                        value: MarioPants.PENGUIN
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.mario',
                            default: 'Mario'
                        }),
                        value: MarioPants.MARIO
                    },
                    {
                        text: formatMessage({
                            id: 'legomario.pants.builder',
                            default: 'Builder'
                        }),
                        value: MarioPants.BUILDER
                    },
                ]
            },
        };
    }

    getInfo (locale) {
        formatMessage.setup({locale});

        return {
            id: LEGOMarioBlocks.EXTENSION_ID,
            name: formatMessage({
                id: 'name',
                default: 'LEGO Mario'
            }),
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: LEGOMarioBlocks.BLOCKS,
            menus: LEGOMarioBlocks.MENUS
        }
    }

    whenBarcode (args) {
        return this._peripheral.barcode == Cast.toNumber(args.BARCODE);
    }

    whenAnyBarcode () {
        return this._peripheral.barcode != MarioColor.NONE;
    }

    getBarcode () {
        return this._peripheral.barcode;
    }

    whenColor (args) {
        return this._peripheral.color == Cast.toNumber(args.SENSOR_COLOR);
    }

    isColor (args) {
        return this._peripheral.color == Cast.toNumber(args.SENSOR_COLOR);
    }

    getColor () {
        return LEGOMarioBlocks.ColorLabel[this._peripheral.color] || LEGOMarioBlocks.ColorLabel[MarioColor.NONE];
    }

    whenPants (args) {
        return this._peripheral.pants == Cast.toNumber(args.PANTS);
    }

    isPants (args) {
        return this._peripheral.pants == Cast.toNumber(args.PANTS);
    }

    getPants () {
        return LEGOMarioBlocks.PantsLabel[this._peripheral.pants] || LEGOMarioBlocks.PantsLabel[MarioPants.NONE];
    }
}

formatMessage.setup({
    translations: {
        en: {
            name: 'LEGO Mario',
            'legomario.whenBarcode': 'when barcode is [BARCODE]',
            'legomario.whenAnyBarcode': 'when any barcode is found',
            'legomario.getBarcode': 'barcode',
            'legomario.whenColor': 'when color is [SENSOR_COLOR]',
            'legomario.isColor': 'color is [SENSOR_COLOR] ?',
            'legomario.getColor': 'color',
            'legomario.whenPants': 'when pants is [PANTS]',
            'legomario.isPants': 'pants is [PANTS] ?',
            'legomario.getPants': 'pants',
            'legomario.color.white': 'White',
            'legomario.color.red': 'Red',
            'legomario.color.blue': 'Blue',
            'legomario.color.yellow': 'Yellow',
            'legomario.color.black': 'Black',
            'legomario.color.green': 'Green',
            'legomario.color.brown': 'Brown',
            'legomario.color.purple': 'Purple',
            'legomario.color.nougatBrown': 'Nougat Brown',
            'legomario.color.cyan': 'Cyan',
            'legomario.color.noColor': 'No color',
            'legomario.pants.none': 'None',
            'legomario.pants.bee': 'Bee',
            'legomario.pants.luigi': 'Luigi',
            'legomario.pants.frog': 'Frog',
            'legomario.pants.tanooki': 'Tanooki',
            'legomario.pants.propeller': 'Propeller',
            'legomario.pants.cat': 'Cat',
            'legomario.pants.fire': 'Fire',
            'legomario.pants.penguin': 'Penguin',
            'legomario.pants.mario': 'Mario',
            'legomario.pants.builder': 'Builder',
        },
        'zh-cn': {
            name: 'LEGO 马力欧',
            'legomario.whenBarcode': '当条形码是[BARCODE]',
            'legomario.whenAnyBarcode': '当扫描到任意条形码',
            'legomario.getBarcode': '条形码',
            'legomario.whenColor': '当颜色是[SENSOR_COLOR]',
            'legomario.isColor': '颜色是[SENSOR_COLOR]?',
            'legomario.getColor': '颜色',
            'legomario.whenPants': '当服装是[PANTS]',
            'legomario.isPants': '服装是[PANTS]?',
            'legomario.getPants': '服装',
            'legomario.color.white': '白色',
            'legomario.color.red': '红色',
            'legomario.color.blue': '蓝色',
            'legomario.color.yellow': '黄色',
            'legomario.color.black': '黑色',
            'legomario.color.green': '绿色',
            'legomario.color.brown': '棕色',
            'legomario.color.purple': '紫色',
            'legomario.color.nougatBrown': '淡棕色',
            'legomario.color.cyan': '青色',
            'legomario.color.noColor': '无色',
            'legomario.pants.none': '无',
            'legomario.pants.bee': '蜜蜂',
            'legomario.pants.luigi': '路易吉',
            'legomario.pants.frog': '青蛙',
            'legomario.pants.tanooki': '狸猫',
            'legomario.pants.propeller': '螺旋桨',
            'legomario.pants.cat': '猫咪',
            'legomario.pants.fire': '火焰',
            'legomario.pants.penguin': '企鹅',
            'legomario.pants.mario': '马力欧',
            'legomario.pants.builder': '建筑工',
        }
    }
});

Scratch.extensions.register(LEGOMarioBlocks);
