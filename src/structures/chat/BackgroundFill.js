class BackgroundFill {
  constructor(data) {
    if (data.type === "solid") {
      this.color = data.color;
    }

    if (data.type === "gradient") {
      this.topColor = data.top_color;

      this.bottomColor = data.bottom_color;

      this.rotationAngle = data.rotation_angle;
    }

    if (data.type === "freeform_gradient") {
      this.colors = data.colors;
    }
  }

  isSolid() {
    return "color" in this && this.color;
  }

  isGradient() {
    return (
      "topColor" in this &&
      this.topColor &&
      "bottomColor" in this &&
      this.bottomColor &&
      "rotationAngle" in this &&
      this.rotationAngle
    );
  }

  isFreeformGradient() {
    return "colors" in this && this.colors;
  }
}

module.exports = BackgroundFill;
