var GpsTrack = Class.create({
  initialize: function() {
    this.corrections = [];
    this.trackPoints = [];
  },
  addPoint: function(point) {
    this.trackPoints.push(point);
    point.track = this;
    return point;
  }
});