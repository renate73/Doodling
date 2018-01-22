function PolarControls(playerAndCameraPositionManager, minRadius = 100, maxRadius = 200, angle = 0) {

    const W = 87
    const A = 65
    const S = 83
    const D = 68

    const angleSpeed = .02
    const radSpeed = 1

    const acceletationMax = 1
    const accelerationIncreaseStep = 0.04
    const accelerationDecreaseStep = 0.014

    const angleAccelerator = new Accelerator(angleSpeed, acceletationMax, accelerationIncreaseStep, accelerationDecreaseStep)
    const radAccelerator = new Accelerator(radSpeed, acceletationMax, accelerationIncreaseStep, accelerationDecreaseStep)

    let currentRadius = maxRadius

    let left = false
    let right = false
    let forward = false
    let backward = false

    this.onKeyDown = function(keyCode) {
        if(keyCode === A)
            left = true
        else if(keyCode === D)
            right = true  
        else if(keyCode === W)
            forward = true
        else if(keyCode === S)
            backward = true
    }

    this.onKeyUp = function(keyCode) {
        if(keyCode === A)
            left = false            
        else if(keyCode === D)
            right = false
        else if(keyCode === W && currentRadius > minRadius)
            forward = false
        else if(keyCode === S && currentRadius < maxRadius)
            backward = false
    }

    this.update = function(time) {
        angle += angleAccelerator.getForce(left ? 1 : right ? -1 : 0)
        
        const tRad = currentRadius + radAccelerator.getForce(forward ? -1 : backward ? 1 : 0)
        if(tRad > minRadius && tRad < maxRadius)
            currentRadius = tRad

        playerAndCameraPositionManager.setPosition(currentRadius, angle)
    }


}