const time = (func, args) => {
    console.time('test')
    func(...args)
    console.timeEnd('test')
}

export default time