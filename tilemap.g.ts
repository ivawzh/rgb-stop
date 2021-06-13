// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "Green Obstacle":
            case "tile2":return tile2;
            case "Red Obstacle":
            case "tile1":return tile1;
            case "Blue Obstacle":
            case "tile3":return tile3;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
