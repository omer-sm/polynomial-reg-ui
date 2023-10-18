export const data = {
    iteration: 0,
    weights: [0],
    j: 0,
    isRunning: false,
}

/**
 * calculates j and returns it and the derivs for the weights
 * @param x x value to calculate for
 * @param y expected value to calculate
 * @param weights weights array, weights[0] = b and so on
 */

const calcJ = (x: number, y: number, weights: number[]): [number[], number] => {
    const predictedY = weights.reduce((total, current, i) => total + current * (x ** i), 0)
    const diff = predictedY - y
    const weightDerivs = weights.map((current, i) => 2 * x ** i * diff)
    return [weightDerivs, diff ** 2]
}
/**
 * trains unadaptively
 * @param xVals x values to train for
 * @param yVals expected values to train for
 * @param weights weights array, weights[0] = b and so on
 * @param learningRate learning rate
 * @param iterations number of iterations
 * @returns [weights, j values]
 */
export const trainUnadaptive = (xVals: number[], yVals: number[], weights: number[], learningRate: number, iterations: number): [number[], number[]] => {
    data.isRunning = true
    data.j = 0
    data.weights = weights
    const jVals: number[] = []
    let iter = 0
    const intervalID = setInterval(() => {
        iter++
        data.iteration = iter
        if (iter === iterations) {
            clearInterval(intervalID)
            setTimeout(() => { data.isRunning = false }, 1000)
            return [weights, jVals]
        }
        const currentJVals: number[] = []
        xVals.forEach((x, index) => {
            const [weightDerivs, j] = calcJ(x, yVals[index], weights)
            currentJVals.push(j)
            weights = weights.map((current, i) => current - learningRate * weightDerivs[i])
            data.weights = weights
        })
        jVals.push(currentJVals.reduce((total, current) => total + current) / currentJVals.length)
        data.j = jVals[iter]
    }, 10)
    setTimeout(() => { data.isRunning = false }, 1000)
    return [weights, jVals]
}

/**
 * trains adaptively
 * @param xVals x values to train for
 * @param yVals expected values to train for
 * @param weights weights array, weights[0] = b and so on
 * @param learningRate learning rate
 * @param iterations number of iterations
 * @returns [weights, j values]
 */
export const trainAdaptive = (xVals: number[], yVals: number[], weights: number[], learningRates: number[], iterations: number): [number[], number[]] => {
    data.isRunning = true
    data.j = 0
    data.weights = weights
    const jVals: number[] = []
    let iter = 0
    const intervalID = setInterval(() => {
        iter++
        data.iteration = iter
        if (iter === iterations) {
            clearInterval(intervalID)
            setTimeout(() => { data.isRunning = false }, 1000)
            return [weights, jVals]
        }
        const currentJVals: number[] = []
        xVals.forEach((x, index) => {
            const [weightDerivs, j] = calcJ(x, yVals[index], weights)
            currentJVals.push(j)
            learningRates = learningRates.map((learningRate, i) => {
                return learningRate * (weightDerivs[i] * learningRate > 0 ? 1.1 : -0.5)
            })
            weights = weights.map((current, i) => current - learningRates[i])
            data.weights = weights
        })
        jVals.push(currentJVals.reduce((total, current) => total + current) / currentJVals.length)
        data.j = jVals[iter]
    }, 10)
    setTimeout(() => { data.isRunning = false }, 1000)
    return [weights, jVals]
}
