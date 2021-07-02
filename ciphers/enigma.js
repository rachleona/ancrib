const info =  require("../info.json")
const protocipher = require("../utils/prototype")

function enigma(plaintext, ciphertext, options)
{
    protocipher.call(this, plaintext, ciphertext, options.key, info.enigma.modes.pure)

    const encrypt = (plaintext, rotor1, rotor2, rotor3, reflector, plugboard=alphabets) => {
        const chars = plaintext.toUpperCase().split("")
    
        const ciphertext = chars.map( c => {
            const code = c.charCodeAt(0)
            if(code < 65 || code > 90) return c
            const char = plugboard[code - 65].charCodeAt(0)
    
            if(rotor2.cur == rotor2.notch) 
            {
                rotor2.step()
                rotor3.step()
            }
            if(rotor1.cur == rotor1.notch) rotor2.step()
            rotor1.step()
    
            const sub1 = rotor1.sequence[char - 65].charCodeAt(0)
            const sub2 = rotor2.sequence[sub1 - 65].charCodeAt(0)
            const sub3 = rotor3.sequence[sub2 - 65].charCodeAt(0)
    
            const ref = reflector[sub3 - 65]
    
            const sub4 = rotor3.sequence.indexOf(ref)
            const sub5 = rotor2.sequence.indexOf(String.fromCharCode(sub4 + 65))
            const sub6 = rotor1.sequence.indexOf(String.fromCharCode(sub5 + 65))
    
            return String.fromCharCode(sub6 + 65)
        })
    
        return ciphertext.join("")
    }
    
    this.encrypt = () => {
        const { k, p, errors } = this.getAttr("k", "p", "errors")
        if(errors.length == 0) 
        {
            this.setC(encrypt(p, k.r1, k.r2, k.r3, k.ref, k.plugboard))
            const rotors = ['r1', 'r2', 'r3']
            rotors.map( v => k[v].reset() )
        }
        return this.getAttr("c", "p", "errors")
    }

    this.decrypt = () => {
        const { k, c, errors } = this.getAttr("k", "c", "errors")
        
        if(errors.length == 0) 
        {
            this.setP(encrypt(c, k.r1, k.r2, k.r3, k.ref, k.plugboard))
            const rotors = ['r1', 'r2', 'r3']
            rotors.map( v => k[v].reset() )
        }
        return this.getAttr("c", "p", "errors")
    }
}

module.exports = { enigma }