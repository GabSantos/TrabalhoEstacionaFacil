import React, { useState, useEffect } from 'react'
import { Text, Alert } from 'react-native'



const Loading = (props) => {
  const [token, setToken] = useState('')
  const [data, setData] = useState({})

  const email = props.route.params.emailCliente
  const nome = props.route.params.nomeCliente
  const senha = props.route.params.senhaCliente
  const telefone = props.route.params.telefoneCliente

  if (props.route.params.login) {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'email': email,
          'senha': senha
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if (json.dados === null) {
            Alert.alert("Email e/ou senha incorreto(s)");
              props.navigation.goBack()
          } else {
            props.navigation.navigate("OcuparVaga", { Email: email, Token: json.dados.token })
          }
        }
        )
        .catch((error) => {
          console.error(error)
        })
    }, []);
  } else {
    useEffect(() => {
      fetch('http://192.168.15.11:8080/api/usuario/cliente', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'nome': nome,
          'email': email,
          'senha': senha,
          'telefone': telefone
        }),
      })
        .then((response) => {
          return response.json()
        })
        .then((json) => {
          if (json.dados === null) {
            json.erros.forEach(erro => {
              Alert.alert(erro)
            })
            props.navigation.goBack()
          } else {
            Alert.alert('Cadastro realizado com sucesso');
            props.navigation.navigate('Login')
          }
        }
        )
        .catch((error) => {
          console.error(error)
        }).then(() => { })
    }, []);
  }
  return <Text>0</Text>
}

export default Loading