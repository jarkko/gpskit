describe('TrackPoint', function() {
  var track, point;
  
  beforeEach(function() {
    track = new GpsTrack;
    point = track.addPoint(new TrackPoint([0,0]));
  });
  
  describe("addCorrection", function() {
    it("should add correction to the point", function() {
      point.addCorrection([1,1]);
      expect(point.correction.correction).toEqual($V([1,1]));
    });
    
    it("should make the correction refer to this point", function() {
      point.addCorrection([1,1]);
      expect(point.correction.point).toEqual(point);
    });
    
    it("should add the correction to the correction list of the track", function() {
      correction = point.addCorrection([1,1]);
      expect(track.corrections).toContain(correction);  
    });
  });
  
  describe("correctedPosition", function() {    
    describe("when no corrections", function() {
      it("should return the original position", function() {
        expect(point.correctedPosition()).toEqual(point.coordinates);
      });
    });
    
    describe("when only one correction", function() {      
      beforeEach(function() {
        var point2 = track.addPoint(new TrackPoint([3,4]));
        point2.addCorrection([5,5]);
      });
      
      it("should move the point exactly the same amount as the single correction", function() {
        expect(point.correctedPosition()).toEqual(point.coordinates.add($V([5,5])));
      });
    });
    
    describe("when multiple corrections", function() {
      beforeEach(function() {
        var point2 = track.addPoint(new TrackPoint([3,4]));
        point2.addCorrection([30,30]);
        
        var point3 = track.addPoint(new TrackPoint([-6,-8]));
        point3.addCorrection([-30,-30]);
      });
      
      it("should move the point based on weighed average of the distance from the corrected point", function() {
        expect(parseInt(point.correctedPosition().distanceFrom($V([10, 10])))).toEqual(0);
      });
    });
  });
});