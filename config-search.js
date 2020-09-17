require('dotenv').config();

module.exports = {
    db: {
      user:process.env.db_user,
      password:process.env.db_password,
      host:process.env.db_host,
      port:process.env.db_port,
      database:'nawassco_restored_13_11_2019',
    },
    layers : [
        {
          name: 'accounts',
          geojsonFileName: __dirname + '/public/accounts.geojson',
          select:`
          SELECT row_to_json(featurecollection) AS json FROM (
            SELECT
              'FeatureCollection' AS type,
              array_to_json(array_agg(feature)) AS features
            FROM (
              SELECT
              'Feature' AS type,
              ST_AsGeoJSON(ST_SetSRID(geom,4326))::json AS geometry,
              row_to_json((
                SELECT p FROM (
                  SELECT
                  gid as fid,
                  accountno,
                  serino as serialno
                ) AS p
              )) AS properties
              FROM accounts
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
    ],
};
