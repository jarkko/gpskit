describe("GpsTrack", function() {
  describe("creation", function() {
    it("should set trackPoints", function() {
      var track = new GpsTrack();
      expect(track.trackPoints).toEqual([]);
    });
  });
  
  describe("addPoint", function() {
    var point, track;

    beforeEach(function() {
      point = new TrackPoint([0,0]);
      track = new GpsTrack();
      track.addPoint(point);
    });

    it("should add the point to this track's points", function() {
      expect(track.trackPoints).toContain(point);
    });

    it("should set the track of the point to this", function() {
      expect(point.track).toEqual(track);
    });

    describe("when existing points", function() {
      it("should add the point in the end of the points array", function() {
        point2 = new TrackPoint([0,0]);
        track.addPoint(point2);
        expect(track.trackPoints.last()).toEqual(point);
      });
    });
  });
});