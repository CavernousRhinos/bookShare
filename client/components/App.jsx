import SignIn from './SignIn';
import {NavBarContainer} from './NavBar';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.children);
  }

  render() {
    return (
      <div>
        <NavBarContainer/>
        <div className="hero">
          <h1>Bookshare</h1>
          <h2>Start sharing books with friends!</h2>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;