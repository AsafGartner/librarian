var Folder = React.createClass({
  mixins: [Droppable],
  componentDidMount: function() {
    this.makeDroppable(this.props.dragManager, this.getDOMNode(), "folder", null);
  },
  componentDidUpdate: function() {
    this.makeDroppable(this.props.dragManager, this.getDOMNode(), "folder", null);
  },
  render: function() {
    return (
      <li className="folder"><a href="#">{this.props.name}</a></li>
    );
  }
});