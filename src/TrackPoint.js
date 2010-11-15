var TrackPoint = Class.create({
  initialize: function(coords) {
    this.coordinates = $V(coords);
  },
  addCorrection: function(correction) {
    this.correction = new PointCorrection(this, correction);
    this.track.corrections.push(this.correction);
    return this.correction;
  },
  correctedPosition: function() {
    if (this.track.corrections.size() == 0) {
      return this.coordinates;
    } else if (this.track.corrections.size() == 1) {
      return this.coordinates.add(this.track.corrections.first().correction);
    }
  }
});