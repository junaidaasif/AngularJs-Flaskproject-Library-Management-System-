// Simple example, see optional options for more configuration.
const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            hex: true,
            rgba: true,
            input: true,

        }
    }
});
pickr.on('change', (color, instance) => {
    const rgbsCol = color.toRGBA().toString();

    // document.documentElement.style.setProperty("--scol", rgbsCol)
    // document.documentElement.style.setProperty("--scolLight", rgbsCol)
    // document.querySelector('body').style.backgroundColor =  rgbsCol;
  
    rgbsColLight = rgbsCol.slice(0,-2)
    localStorage.setItem("Scolor", rgbsCol);
    localStorage.setItem("ScolorLight", rgbsColLight + "0.18)");
    let str = localStorage.getItem("Scolor");
    let str1 = localStorage.getItem("ScolorLight");

    document.documentElement.style.setProperty("--scol", str)
    document.documentElement.style.setProperty("--scolLight", str1)

})

function showScol() {
    let Srbg = localStorage.getItem("Scolor");
    let SrbgLight = localStorage.getItem("ScolorLight");
    


    document.documentElement.style.setProperty("--scol", Srbg)
    document.documentElement.style.setProperty("--scolLight", SrbgLight)
}
showScol();

