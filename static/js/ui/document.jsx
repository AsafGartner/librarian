var Document = React.createClass({
  mixins: [Droppable],
  componentDidMount: function() {
    this.makeDroppable(this.props.dragManager, this.getDOMNode(), "doc", null);
  },
  render: function() {
    return (
      <div className="doc">
        {this.props.name}
      </div>
    );
  }
});