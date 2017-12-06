const superagent = require('superagent');
const api = 'http://localhost:3002/'

var load = () => {
    superagent.get(api + 'usuarios')
    .end((err, res) => {
        $('.usuarios').html('');        
        if(res && res.body) {
            res.body.forEach(item => {
                $('.usuarios').append(`<li data-id="${item._id}"><strong>${item.nome || '---'}</strong><p>Rua: ${item.logradouro || ''}, ${item.numero || ''} - ${item.complemento || '-'}</p>
                <p>CEP: ${item.cep || ''}</p>
                <p>Cidade: ${item.cidade || ''} - ${item.estado || '-'}</p>
                </li>`);
            })
        }
        $('.usuarios').find('li').on('click', function(e) {
            if(confirm('Deseja excluir? ')) {
                const id = $(this).data('id');
                superagent.del(`${api}usuarios/${id}`)
                .end((err, res) => {
                    if(!err && res) {
                        alert('excluido com sucesso');
                    }
                    load()
                });
            }
            return false;
        })

    })
}

load();

$('#cepbtn').on('click', (e) => {
    e.preventDefault();
    let cep = $('[name=cep]').val();

    superagent.get(`https://viacep.com.br/ws/${cep}/json`)
    .end((err, res) => {
        if(res && res.body) {
            const r = res.body
            $('[name=logradouro]').val(r.logradouro);
            $('[name=bairro]').val(r.bairro);
            $('[name=cidade]').val(r.localidade);
            $('[name=estado]').val(r.uf);
            $('[name=numero]').focus()
        }
    });
    return false;
})

$('form').on('submit', (e) => {
    e.preventDefault()
    var data = $('form').serialize();
    superagent.post(api + 'usuarios')
    .send(data)
    .end((err, res) => {
        alert(err ? 'Erro' : 'Cadastrado!')
        load()
    })
    return false;
})