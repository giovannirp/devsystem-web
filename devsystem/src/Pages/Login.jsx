import React, { useState } from 'react'
import "../Styles/Login.scss"
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  async function loginForm(event) {
    event.preventDefault();

    // Busca a lista de usuários cadastrados na API
    const resposta = await axios.get("http://localhost:3000/users")

    // Procura na lista de usuários, aquele que possui o email e senha
    const usuario = resposta.data.find((user) => {
      return user.email === email && user.senha === senha;
    });

    if (usuario) {
      alert("Login realizado com sucesso!");
      sessionStorage.setItem("logado", "true");
      window.location.href = "/homeLogado";
    } else {
      alert("Usuário ou senha incorretos!");
    }

  }

  return (
    <main className="container login">
      <section className="login-card">
        <h1>Login</h1>

        <form onSubmit={loginForm}>
          <article className="form-control">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              id="email"
              placeholder="Digite seu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </article>

          <article className="form-control">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </article>

          <button type="submit">Entrar</button>
        </form>

      </section>
    </main>
  )
}
