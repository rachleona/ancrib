function rsaKeyPair(pub, pri)
{

}

function enigmaSetup(rotor1, rotor2, rotor3, ref, plugboard)
{
    this.r1 = rotor1
    this.r2 = rotor2
    this.r3 = rotor3
    this.ref = ref
    this.plugboard = plugboard
}

function rotor(sequence, notch, start)
{
    this.notch = sequence[notch]
    this.start = start
    let arr = sequence.splice(start, 26 - start)
    arr.push(...sequence)
    this.sequence = arr
    this.cur = this.sequence[0]

    this.step = () => {
        this.sequence.splice(0, 1)
        this.sequence.push(this.cur)
    
        this.cur = this.sequence[0]
    }
}

const rotorseqI = "EKMFLGDQVZNTOWYHXUSPAIBRCJ".split("")
const rotorseqII = "AJDKSIRUXBLHWTMCQGZNPYFVOE".split("")
const rotorseqIII = "BDFHJLCPRTXVZNYEIWGAKMUSQO".split("")
const rotorseqIV = "ESOVPZJAYQUIRHXLNFTGKDCMWB".split("")
const rotorseqV = "VZBRGITYUPSDNHLXAWMJQOFECK".split("")

const rotor1 = new rotor(rotorseqI, 16, 9)
const rotor2 = new rotor(rotorseqII, 4, 1)
const rotor3 = new rotor(rotorseqIII, 21, 22)
const rotor4 = new rotor(rotorseqIV, 9, 7)
const rotor5 = new rotor(rotorseqV, 25, 6)

const defaultRef = "RYUHQSLDPXNGOKMIEAFZCWVJBT".split("")
const defaultPb = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

module.exports = { rsaKeyPair, enigmaSetup, rotorChoices: [rotor1, rotor2, rotor3, rotor4, rotor5], defaultRef, defaultPb }