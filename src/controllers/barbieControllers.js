import dados from "../models/dados.js"; 
const {barbies} = dados; 

const getAllBarbies = (req, res) => {
    const resultado = barbies; 
    res.status(200).json ({
        total: barbies.length,
        barbies: resultado
    })
}

const getBarbieById = (req, res) => {
    let id = parseInt(req.params.id); 

    const barbie= barbies.find(b => b.id === id);

    res.status(200).json ({
        success:true, 
        barbie: barbie
    })
}

const createBarbie = (req, res) => {
    const {nome, profissao, anoLancamento} = req.body; 

    // Se eu quiser fazer validações do tipo, casa obrigatório ou qualquer outro. 

    if (!nome || !profissao) {
        return res.status(400).json ({
            success: false,
            message: "Nome e profissão são obrigatórios!"
        });
    }

    // Depois que validar, posso criar o meu bruxo usando uma const, e adicionar dentro do array.

    const novaBarbie = {
        id:  barbies.length + 1,
        nome: nome, 
        profissao: profissao, 
        anoLancamento: anoLancamento
    }

    // Push no array
    barbies.push(novaBarbie); 

    res.status(201).json ({
        success: true, 
        message: "Barbie cadastrada com sucesso!",
        barbie: novaBarbie
    })
}

//NEW
//Deletar um bruxo

const deleteBarbie = (req, res) => {
    let id = parseInt(req.params.id);

    //Verificar se esse id existe!
    const barbieParaRemover = barbies.find(b => b.id === id);

    if (!barbieParaRemover) {
        return res.status(404).json({
            success: false,
            message: `Essa barbie não existe, ${id}`
        })
    }

    const barbiesFiltradas = barbies.filter(barbie => barbie.id != id);

barbies.splice(0, barbies.length, ...barbiesFiltradas);

res.status(200).json ({
    success: true,
    message: "A barbie foi removida com sucesso",
    barbieRemovida: barbieParaRemover
})
}

export {getAllBarbies, getBarbieById, createBarbie, deleteBarbie};