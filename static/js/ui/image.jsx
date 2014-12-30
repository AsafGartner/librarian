var Image = React.createClass({
  mixins: [Draggable],
  componentDidMount: function() {
    this.makeDraggable(this.props.dragManager, this.getDOMNode(), "image", null);
  },
  componentDidUpdate: function() {
    this.makeDraggable(this.props.dragManager, this.getDOMNode(), "image", null);
  },
  render: function() {
    return (
      <div className="image">
        {this.props.name}
      </div>
    );
  }
});