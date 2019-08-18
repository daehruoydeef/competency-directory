import React, { Component, Fragment } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import api from "../api"
import LocalizedStrings from 'react-localization';
var language = require("../languages/languages.json")

let strings = new LocalizedStrings(language);

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    let lang = localStorage.getItem("language");
    console.log(lang)
    strings.setLanguage(lang);
    let response = await api.getEntryWithId(this.props.match.params.id);
    response.json().then(data => {
      this.setState({
        entry: data,
        loading: false
      })
    });
  }

  loadingAnimation = () => {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: 20,
        outline: "none"
      }}>
        <Typography color="textSecondary" gutterBottom>
          loading
          </Typography>
      </div>
    )
  }

  entryPage = () => {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: 20,
        outline: "none"
      }}>
        <Card
          onClick={e => e.stopPropagation()}
          style={{ flex: 1, padding: "18px 12px", maxWidth: 420, }}
        >
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "baseline",
              height: "100%",
              boxSizing: "border-box"
            }}
          >

            <Typography color="textSecondary" gutterBottom>
              {strings.type}: {this.state.entry.skillType}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              style={{ lineHeight: 1.2 }}
              gutterBottom
            >
              {this.state.entry.prefLabel.value}
            </Typography>
            <Fragment>
              <Chip
                label={strings.language+":" + this.state.entry.prefLabel.language}
                style={{ margin: "3px 7px 3px -1px", height: 22 }}
              />
              <Chip
                label={strings.reuse + ":" + this.state.entry.skillReuseLevel.substr(2)}
                style={{ margin: "3px 7px 18px -1px", height: 22 }}
              />
            </Fragment>
            <Typography variant="subtitle1">{strings.description}: </Typography>
            <Typography paragraph>
              {this.state.entry.description.value}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  render() {
    return (
      // loading animation
      this.state.loading ? this.loadingAnimation() : this.entryPage()
    );
  }
}

export default Entry;
