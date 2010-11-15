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
    } else {
      var self = this;
      var total_dist = this.track.corrections.map(function(c) {
        return self.coordinates.distanceFrom(c.point.coordinates)
      }).inject(0, function(a,b) { 
        return a + b;
      });

      var total = this.coordinates;

      this.track.corrections.each(function(c) {
        total = total.add(c.correction.multiply(1 - self.coordinates.distanceFrom(c.point.coordinates) / total_dist ));
      });

      return total;
    }
  }
});