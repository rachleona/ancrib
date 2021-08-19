function rsaKeyPair(pub, pri) {}

function enigmaSetup(rotor1, rotor2, rotor3, ref, plugboard) {
  this.r1 = rotor1
  this.r2 = rotor2
  this.r3 = rotor3
  this.ref = ref
  this.plugboard = plugboard
}

function rotor(sequence, notch, start) {
  this.notch = notch
  this.start = start
  this.sequence = sequence.toUpperCase().split("")
  this.reset = () => {
    const i = start
    let arr = this.sequence.splice(i, 26 - i)
    arr.push(...this.sequence)
    this.sequence = arr
    this.cur = this.sequence[0]
  }

  this.step = () => {
    this.sequence.splice(0, 1)
    this.sequence.push(this.cur)

    this.cur = this.sequence[0]
  }

  this.reset()
}

const defaultRef = "RYUHQSLDPXNGOKMIEAFZCWVJBT".split("")
const defaultPb = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

module.exports = {
  defaultRef,
  defaultPb,
  rsaKeyPair,
  enigmaSetup,
  rotor
}
