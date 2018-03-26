/**
 *This is DFRobot:motor user motor and steering control function.
 */
//% weight=10 color=#DF6721 icon="\uf013" block="DF-Driver"
namespace motor {
    const PCA9634_REG_MODE1	=	0x00		// Mode register 1
    const PCA9634_REG_MODE2	=	0x01		// Mode register 2
    const PCA9634_REG_PWM0	=	0x02		// brightness control LED0
    const PCA9634_REG_PWM1	=	0x03		// brightness control LED1
    const PCA9634_REG_PWM2	=	0x04		// brightness control LED2
    const PCA9634_REG_PWM3	=	0x05		// brightness control LED3
    const PCA9634_REG_PWM4	=	0x06		// brightness control LED4
    const PCA9634_REG_PWM5	=	0x07		// brightness control LED5
    const PCA9634_REG_PWM6	=	0x08		// brightness control LED6
    const PCA9634_REG_PWM7	=	0x09		// brightness control LED7
    const PCA9634_REG_GRPPWM	=	0x0A		// group duty cycle
    const PCA9634_REG_GRPFREQ	=	0x0B		// group frequency
    const PCA9634_REG_LEDOUT0	=	0x0C		// LED output state 0
    const PCA9634_REG_LEDOUT1	=	0x0D		// LED output state 1
    const PCA9634_REG_SUBADR1	=	0x0E		// I2C-bus subaddress 1
    const PCA9634_REG_SUBADR2	=	0x0F		// I2C-bus subaddress 2
    const PCA9634_REG_SUBADR3	=	0x10		// I2C-bus subaddress 3
    const PCA9634_REG_ALLCALLADR =	0x11		// LED All I2C-bus address
    
    const PCA9634_ALL_LED_TO_OFF	=			0x00
    const PCA9634_ALL_LED_TO_ON		=		0x55
    const PCA9634_ALL_LED_TO_PWM	=			0xAA
    const PCA9634_ALL_LED_TO_GRPPWM	=		0xFF
    
    const ADDRESS_HI				=			0x12
    const ADDRESS_LO				=			0x34
    
    const PCA9634_ERROR_INVALID_LED     =      -1

    /**
     * The user can choose the step motor model.
     */
    export enum Stepper { 
        //% block="42"
        Ste1 = 1,
        //% block="28"
        Ste2 = 2
    }

    /**
     * The user can select the 8 steering gear controller.
     */
    export enum Servos {
        S1 = 0x08,
        S2 = 0x07,
        S3 = 0x06,
        S4 = 0x05,
        S5 = 0x04,
        S6 = 0x03,
        S7 = 0x02,
        S8 = 0x01
    }

    /**
     * The user selects the 4-way dc motor.
     */
    export enum Motors {
        M1 = 0x1,
        M2 = 0x2
    }

    /**
     * The user defines the motor rotation direction.
     */
    export enum Dir {
        //% blockId="CW" block="CW"
        CW = 1,
        //% blockId="CCW" block="CCW"
        CCW = -1,
    }

    /**
     * The user can select a two-path stepper motor controller.
     */
    export enum Steppers {
        M1_M2 = 0x1,
        M3_M4 = 0x2
    }

    let initialized = false

    function write_reg(addr: number, value: number) {
        let buf = pins.createBuffer(1)
        buf[0] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function initPCA9634(): void {
        write_reg( PCA9634_REG_MODE1, 0x00);
        write_reg( PCA9634_REG_MODE2, 0x16);
        write_reg( PCA9634_REG_LEDOUT0, PCA9634_ALL_LED_TO_PWM);
        write_reg( PCA9634_REG_LEDOUT1, PCA9634_ALL_LED_TO_PWM);
        initialized = true
    }


    /**
	 * Execute a motor
     * M1~M4.
     * speed(0~255).
    */
    //% weight=90
    //% blockId=motor_MotorRun block="Motor|%index|dir|%Dir|speed|%speed"
    //% speed.min=0 speed.max=255
    //% index.fieldEditor="gridpicker" index.fieldOptions.columns=2
    //% direction.fieldEditor="gridpicker" direction.fieldOptions.columns=2
    export function MotorRun(index: Motors, direction: Dir, speed: number): void {
        if (!initialized) {
            initPCA9634()
        }
        switch (index) { 
            case Motors.M1: { 
                if (direction == Dir.CCW) {
                    write_reg(4, 255)
                    write_reg(5, 255-speed)
                } else if (direction == Dir.CW) { 
                    write_reg(4, 255-speed)
                    write_reg(5, 255)
                }
            } break;
            case Motors.M2: {
                if (direction == Dir.CCW) {
                    write_reg(6, 255)
                    write_reg(7, 255-speed)
                } else if (direction == Dir.CW) { 
                    write_reg(6, 255-speed)
                    write_reg(7, 255)
                }
            } break;
        }

    }

}