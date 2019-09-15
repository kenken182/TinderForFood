import React from 'react'
import { Card, Icon, Avatar, Button } from 'antd'

const { Meta } = Card;

class ChoiceCard extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.name != nextProps.name) {
      this.setState({vote: 0})
    }
  }

  state = {vote: 0}
  onClick = () => {
    this.setState({vote: this.state.vote += 1})
  }
  render() {
    return (
      <Card style={{ width:310, border: '1px solid black', padding: '20px 20px' }}>
        <Meta
          avatar={<Avatar src={this.props.icon} />}
          title={this.props.name}
          description={`Rating: ` + this.props.rating}
        />
        <div>
          Votes: {this.state.vote}
        </div>
        <Button size={'large'} onClick={this.onClick} style={{borderRadius: '50%', size: '30px'}}/>
      </Card>
    )
  }
}

export default ChoiceCard
