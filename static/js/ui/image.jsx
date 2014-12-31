var Image = React.createClass({
  mixins: [Draggable],
  componentDidMount: function() {
    this.makeDraggable(this.props.dragManager, this.getDOMNode(), "image", null);
  },
  render: function() {
    var style = {
      backgroundImage: 'url(' + this.props.image_path + ')',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    };

    return (
      <div className="image">
        <a href="#" style={style}></a>
      </div>
    );
  }
});