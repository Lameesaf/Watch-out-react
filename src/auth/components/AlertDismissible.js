import React, { Component } from 'react'
// import Alert from 'react-bootstrap/Alert'

class AlertDismissible extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: true,
      };
    }
  
    render() {
      const handleDismiss = () => this.setState({ show: false });
      if (this.state.show) {
        let className ;
        switch (this.props.variant){

          case 'success':   className = 'flash-success';break;
          case 'danger':  className = 'flash-error';break;
          default: className = 'flash-warning'; 
        }
        return (
            <alert className = { `${className} animated`} key={this.props.index}  variant={this.props.variant} onClose={handleDismiss}>
                    {this.props.message}
            </alert>
        )
      } else {
        return <React.Fragment/>
      }
    }
  }
  
export default AlertDismissible
