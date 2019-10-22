import React, { Component } from "react";
import "./New.css";
import api from "../services/api";

export default class pages extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hashtags: ""
  };

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { image, author, place, description, hashtags } = this.state;
    const data = new FormData();

    data.append("image", image);
    data.append("author", author);
    data.append("place", place);
    data.append("description", description);
    data.append("hashtags", hashtags);

    await api.post("posts", data);
    this.props.history.push("/");
  };

  render() {
    const { author, place, description, hashtags } = this.state;
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleImageChange} />
        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          value={author}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="place"
          placeholder="Local do post"
          value={place}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do post"
          value={description}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          value={hashtags}
          onChange={this.handleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
