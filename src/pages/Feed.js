import React, { Component } from "react";
import more from "../assets/more.svg";
import like from "../assets/like.svg";
import comment from "../assets/comment.svg";
import send from "../assets/send.svg";
import "./Feed.css";
import api from "../services/api";
import io from "socket.io-client";

export default class pages extends Component {
  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSocket();
    const response = await api.get("posts");
    this.setState({
      feed: response.data
    });
  }

  registerToSocket = () => {
    const socket = io("http://localhost:3333");

    socket.on("post", newPost => {
      this.setState({
        feed: [newPost, ...this.state.feed]
      });
    });

    socket.on("like", likePost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likePost._id ? likePost : post
        )
      });
    });
  };

  handleLike = async id => {
    await api.post(`/posts/${id}/like`);
  };

  render() {
    const { feed } = this.state;
    return (
      <section id="post-list">
        {feed.map(post => (
          <article key={post._id}>
            <header>
              <div className="user-info">
                <span>{post.author}</span>
                <span className="place">{post.place}</span>
              </div>
              <img src={more} alt="mais" />
            </header>
            <img
              src={`http://localhost:3333/files/${post.image}`}
              alt="Imagem do post"
            />
            <footer>
              <div className="actions">
                <button onClick={() => this.handleLike(post._id)}>
                  <img src={like} alt="dar like" />
                </button>
                <img src={comment} alt=" fazer commentarios" />
                <img src={send} alt="enviar" />
              </div>
              <strong>{post.likes} curtidas</strong>
              <p>
                {post.description}
                <span>{post.hashtags}</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    );
  }
}
