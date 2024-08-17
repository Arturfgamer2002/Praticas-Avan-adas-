const jwt = require('jsonwebtoken')

exports.validaToken = async (req,res) =>{

    const {token} = req.body
    console.log('validar token', token)
    try{
        if(!token) {
            console.log('retorna http 400')
            res.status(400).json({valid: false})
        }else{
            jwt.verify(token, process.env.JWT_KEY, (err,decoded) =>{
                if(err) {
                    console.log('retorna http 400')
                    res.status(401).json({valid: false})
                }else{
                    console.log('retorna http 200')
                    res.status(200).json({valid: true})
                }
            })
        }
    } catch (err) {
        console.log('erro ao validar',err)
    }
}