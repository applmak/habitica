var sinon = require('sinon');
var chai = require("chai")
chai.use(require("sinon-chai"))
var expect = chai.expect

require('coffee-script');
var count = require('../../common/script/count');

describe('count', function() {
  describe('beastMasterProgress', function() {
    it('returns 0 if no pets', function() {
      var pets = {};
      var beastMasterTotal = count.beastMasterProgress(pets);
      expect(beastMasterTotal).to.eql(0);
    });

    it('counts drop pets', function() {
      var pets = { "Dragon-Red": 1, "Wolf-Base": 2 };
      var beastMasterTotal = count.beastMasterProgress(pets);
      expect(beastMasterTotal).to.eql(2);
    });

    it('does not count quest pets', function() {
      var pets = { "Dragon-Red": 1, "Gryphon-Base": 1 };
      var beastMasterTotal = count.beastMasterProgress(pets);
      expect(beastMasterTotal).to.eql(1);
    });

    it('does not count special pets', function() {
      var pets = {
        "Wolf-Base": 2,
        "Wolf-Veteran": 1,
        "Wolf-Cerberus": 1,
        "Dragon-Hydra": 1
      };
      var beastMasterTotal = count.beastMasterProgress(pets);
      expect(beastMasterTotal).to.eql(1);
    });

    it('counts drop pets that have been raised to a mount', function() {
      var raisedToMount = -1;
      var pets = { "Dragon-Red": 1, "Wolf-Base": raisedToMount };
      var beastMasterTotal = count.beastMasterProgress(pets);
      expect(beastMasterTotal).to.eql(2);
    });

    it('does not counts drop pets that have been released', function() {
      var releasedPet = 0;
      var pets = { "Dragon-Red": 1, "Wolf-Base": releasedPet };
      var beastMasterTotal = count.beastMasterProgress(pets);
      expect(beastMasterTotal).to.eql(1);
    });
  });

  describe('mountMasterProgress', function() {
    it('returns 0 if no mounts', function() {
      var mounts = {};
      var mountMasterTotal = count.mountMasterProgress(mounts);
      expect(mountMasterTotal).to.eql(0);
    });

    it('counts drop mounts', function() {
      var mounts = { "Dragon-Red": true, "Wolf-Base": true };
      var mountMasterTotal = count.mountMasterProgress(mounts);
      expect(mountMasterTotal).to.eql(2);
    });

    it('does not count quest mounts', function() {
      var mounts = { "Dragon-Red": true, "Gryphon-Base": true };
      var mountMasterTotal = count.mountMasterProgress(mounts);
      expect(mountMasterTotal).to.eql(1);
    });

    it('does not count special mounts', function() {
      var mounts = { "Wolf-Base": true, "BearCub-Polar": true};
      var mountMasterTotal = count.mountMasterProgress(mounts);
      expect(mountMasterTotal).to.eql(1);
    });

    it('only counts drop mounts that are currently owned', function() {
      var notCurrentlyOwned = false;
      var mounts = { "Dragon-Red": true, "Wolf-Base": notCurrentlyOwned };
      var mountMasterTotal = count.mountMasterProgress(mounts);
      expect(mountMasterTotal).to.eql(1);
    });
  });
});
