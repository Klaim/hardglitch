
export {
    load_assets,
    dummy_loader,
}

// Takes an object that looks like this:
//
// asset_desc {
//   images: { // Name of the type of asset, and also name of the group of assets.
//     asset_loader: load_images, // Function that will be used to produce the asset.
//                                // In this example, let's assume that load_images will create "img" elements.
//     image_a : "./img/image_a.png", // Key is the name of the object that will be generated,
//     image_b : "./img/image_b.png", // the value is the path to the file to use for the asset.
//    },
//    audio: { /* ... */ }, // This one will create "audio" elements,
//    /* ... */                   // etc.
// };
//
// Then the asset can be retrieved through the variables of the name
// of the assets:
//
// import * as assets from ""./assets.js";
// let my_assets = await assets.load_asset(asset_desc);
// let sprite = new Sprite( my_assets.images.image_a );
//
// Each loader function must be of the form (and return the same structure):
//   function loader(path) { // Probably needs to be async if it can load in parallel.
//
// And it must return a Promise with a result value object looking like this:
//    {
//      myloader: { // must have the name of the group of assets
//       "asset_name": new Asset()  // name of asset : the loaded asset
//      }
//    };
//
//
function load_assets(assets_desc){
    console.assert(assets_desc);
    let promises = [];
    const loader_name = "asset_loader";
    // We launch the loadings in "parallel" (as parallel as JS can do...)
    for(let asset_group_name in assets_desc){
        let asset_group = assets_desc[asset_group_name];
        let loader = asset_group[loader_name];
        console.assert(loader);

        for(let asset_name in asset_group){
            if(asset_name == loader_name) // skip the loader function
                continue;
            let promise = loader(asset_name, asset_group[asset_name]);
            console.assert(promise);
            console.assert(promise instanceof Promise);
            promises.push(promise);
        }
    }

    return Promise.all(promises) // Wait for all the loadings to be done.
    .then((all_loaded_assets)=>{ // We managed to load all the assets.
        // Merge all resulting objects together.
        let all_assets = {};
        all_loaded_assets.forEach(asset_data => {
            all_assets = Object.assign(all_assets, asset_data);
        });
        return all_assets;
    },(reason)=>{ // if there is any error
        throw "Failed to load assets: " + reason;
    });
}

function dummy_loader(name, path){
    return new Promise((resolve)=>{
        console.log( `dummy loading: ${name} => ${path}` );
        let result = { dummy : {} };
        result.dummy[name] = { source: path };
        return result;
    });
}

