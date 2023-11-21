let oldsensorM = 0
let turnbackcount = 0
let CalEndPoint = 0
let CalCenter = 0
maqueenPlusV2.I2CInit()
basic.showNumber(0)
let speed_Right = 0
let speed_Left = 0
let SensorL1 = 0
let SensorL2 = 0
let SensorM = 0
let SensorR1 = 0
let SensorR2 = 0
music.play(music.stringPlayable("G G F C E F A C5 ", 110), music.PlaybackMode.UntilDone)
basic.forever(function () {
    speed_Right = 60
    speed_Left = 60
    SensorL1 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1)
    SensorL2 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2)
    SensorM = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)
    SensorR1 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1)
    SensorR2 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2)
    CalCenter = SensorM + (SensorL1 + SensorR1)
    CalEndPoint = SensorL2 + SensorR2
    if (SensorM == 1) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Left)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Right)
    } else if (SensorR1 == 1) {
        speed_Left = 255
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Left)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Right)
    } else if (SensorL1 == 1) {
        speed_Right = 255
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Left)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Right)
    } else if (SensorL2 == 1 && SensorR2 == 1) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Left)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Right)
        basic.pause(50)
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
        basic.pause(50)
        turnbackcount = 0
        oldsensorM = 0
        speed_Right = 50
        speed_Left = 50
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Backward, speed_Left)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Right)
        while (turnbackcount < 2) {
            SensorM = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)
            if (SensorM == 1 && oldsensorM == 0) {
                turnbackcount += 1
                basic.showNumber(turnbackcount)
            }
            oldsensorM = SensorM
        }
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
        basic.pause(50)
        turnbackcount = 0
        basic.showNumber(turnbackcount)
        speed_Right = 35
        speed_Right = 35
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Left)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Backward, speed_Right)
        SensorM = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)
        while (SensorM != 1) {
            SensorM = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)
        }
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
        basic.pause(200)
    } else {
        if (oldsensorM == 1) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Left)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, speed_Right)
            basic.pause(100)
        }
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.LeftMotor)
        maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.RightMotor)
    }
    oldsensorM = SensorM
    basic.pause(10)
})
