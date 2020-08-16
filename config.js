require('dotenv').config();

module.exports = {
    db: {
      user:process.env.db_user,
      password:process.env.db_password,
      host:process.env.db_host,
      post:process.env.db_port,
      database:'nawassco_restored_13_11_2019',
    },
    mbtiles: __dirname + '/data/nakuru.mbtiles',
    minzoom: 8,
    maxzoom: 16,
    layers : [
        {
            name: 'pipeline',
            geojsonFileName: __dirname + '/pipeline.geojson',
            select: `
            SELECT row_to_json(featurecollection) AS json FROM (
                SELECT
                  'FeatureCollection' AS type,
                  array_to_json(array_agg(feature)) AS features
                FROM (
                  SELECT
                    'Feature' AS type,
                    ST_AsGeoJSON(ST_SetSRID(ST_MakeValid(geom),4326))::json AS geometry,
                    row_to_json((
                      SELECT t FROM (
                        SELECT
                          16 as maxzoom,
                          10 as minzoom
                      ) AS t
                    )) AS tippecanoe,
                    row_to_json((
                      SELECT p FROM (
                        SELECT
                          gid as fid,
                          purpose,
                          size,
                          material_1 as material,
                          class as pipe_class,
                          instal_yr as installation_year,
                          contractor,
                          imp_status,
                          remarks,
                          status_ as status
                      ) AS p
                    )) AS properties
                  FROM pipeline
                  WHERE NOT ST_IsEmpty(geom)
                ) AS feature
              ) AS featurecollection
            `
        },
        {
          name: 'accounts',
          geojsonFileName: __dirname + '/accounts.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    15 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                  SELECT
                  gid as fid,
                  accountno,
                  unit, 
                  serinostat as serial_no_status, 
                  serino as serial_no, 
                  size, 
                  mtrbrd, 
                  status, 
                  install, 
                  remarks_an
                ) AS p
              )) AS properties
              FROM accounts
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'toilets',
          geojsonFileName: __dirname + '/toilets.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    15 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                  SELECT
                  gid as fid,
                  type, 
                  connection, 
                  toilets, 
                  project
                ) AS p
              )) AS properties
              FROM toilets
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'public_toilet',
          geojsonFileName: __dirname + '/public_toilet.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    12 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                  SELECT
                  gid as fid,
                  name, 
                  operatedby
                ) AS p
              )) AS properties
              FROM public_toilet
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'bulkmeter',
          geojsonFileName: __dirname + '/nawassco_blkmtr.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    12 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                  SELECT
                  gid as fid, 
                  size, 
                  type, 
                  dma, 
                  install_yr as installation_year, 
                  status, 
                  zone, 
                  location, 
                  meter_type, 
                  metered, 
                  util_name, 
                  serial_no, 
                  material,
                  route
                ) AS p
              )) AS properties
              FROM nawassco_blkmtr
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'man_holes',
          geojsonFileName: __dirname + '/man_holes.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    14 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                  SELECT
                  gid as fid, 
                  name, 
                  cmt, 
                  manhole__2, 
                  manhole_10, 
                  mh_materia, 
                  cover_mate, 
                  featuremat, 
                  owner, 
                  year, 
                  covershape, 
                  covermate, 
                  cover_shap, 
                  depth_in_1,
                  year_of_co, 
                  depth_ft_, 
                  pipe_inch_, 
                  pipemat, 
                  yearconstr, 
                  feature__2, 
                  cover_ma_1, 
                  cover_sh_1, 
                  depth, 
                  year_of__1, 
                  mh_id, 
                  typeshape, 
                  pic_id, 
                  mh_shape, 
                  mh_cover
                ) AS p
              )) AS properties
              FROM man_holes
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'boreholes',
          geojsonFileName: __dirname + '/boreholes.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    12 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                  SELECT
                  gid as fid, 
                  location, 
                  "borehole n" as no_borehole, 
                  status, 
                  ownership, 
                  "yield (m3/" as yield_m3, 
                  "power sour" as power_sour, 
                  "year drill" as year_drill, 
                  "target are" as target, 
                  "pumping ho" as pumping_ho, 
                  depth, 
                  pmp_outlet, 
                  pump_sz, 
                  pmp_typ, 
                  m_serial, 
                  p_serial, 
                  p_make, 
                  m_make, 
                  p_model,
                  m_model, 
                  m_rating, 
                  p_rating, 
                  p_head, 
                  m_yr_inst, 
                  p_yr_inst, 
                  remarks, 
                  drop_pp_d, 
                  "dsgncap(m3" as design_capacity_m3
                ) AS p
              )) AS properties
              FROM boreholes
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'pump_stations',
          geojsonFileName: __dirname + '/pump_stations.geojson',
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
                    SELECT t FROM (
                      SELECT
                        16 as maxzoom,
                        12 as minzoom
                    ) AS t
                  )) AS tippecanoe,
                  row_to_json((
                    SELECT p FROM (
                      SELECT
                        gid as fid, 
                        name, 
                        source
                    ) AS p
                  )) AS properties
                FROM pump_stations
                WHERE NOT ST_IsEmpty(geom)
              ) AS feature
            ) AS featurecollection
          `
      },
        {
            name: 'reservoirs',
            geojsonFileName: __dirname + '/reservoirs.geojson',
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
                      SELECT t FROM (
                        SELECT
                          16 as maxzoom,
                          12 as minzoom
                      ) AS t
                    )) AS tippecanoe,
                    row_to_json((
                      SELECT p FROM (
                        SELECT
                          gid as fid, 
                          name, 
                          type, 
                          capacity, 
                          "material m" as material, 
                          installati as installation, 
                          "areas serv" as area_serve, 
                          "inlet pp s" as inlet_pipe, 
                          "outlet pp" as outlet_pipe, 
                          "height of" as height, 
                          "ground ele" as elevation, 
                          shape, 
                          descriptio
                      ) AS p
                    )) AS properties
                  FROM reservoirs
                  WHERE NOT ST_IsEmpty(geom)
                ) AS feature
              ) AS featurecollection
            `
        },
        {
          name: 'waterworks',
          geojsonFileName: __dirname + '/waterworks.geojson',
          select:`
          SELECT row_to_json(featurecollection) AS json FROM (
            SELECT
              'FeatureCollection' AS type,
              array_to_json(array_agg(feature)) AS features
            FROM (
              SELECT
              'Feature' AS type,
              ST_AsGeoJSON(ST_SetSRID(ST_MakeValid(geom),4326))::json AS geometry,
              row_to_json((
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    8 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                SELECT
                gid as fid, 
                name, 
                source, 
                des_capcty as design_capacity, 
                oper_capct as operation_capacity
              ) AS p
              )) AS properties
                FROM water_twrks
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'plots',
          geojsonFileName: __dirname + '/plots.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    15 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                SELECT
                  gid as fid,
                  plotnr, 
                  plot, 
                  block
                ) AS p
              )) AS properties
              FROM plots
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'plots_annotation',
          geojsonFileName: __dirname + '/plots_annotation.geojson',
          select:`
          SELECT row_to_json(featurecollection) AS json FROM (
            SELECT
              'FeatureCollection' AS type,
              array_to_json(array_agg(feature)) AS features
            FROM (
              SELECT
              'Feature' AS type,
              ST_AsGeoJSON(ST_SetSRID(ST_CENTROID(geom),4326))::json AS geometry,
              row_to_json((
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    16 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                SELECT
                  gid as fid,
                  plotnr, 
                  plot, 
                  block
                ) AS p
              )) AS properties
              FROM plots
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'zones',
          geojsonFileName: __dirname + '/zones.geojson',
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
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    8 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                SELECT
                  gid, 
                  area, 
                  perimeter, 
                  zone, 
                  zn_id
                ) AS p
              )) AS properties
              FROM zones
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        },
        {
          name: 'point_annotation',
          geojsonFileName: __dirname + '/point_annotation.geojson',
          select:`
          WITH annotations AS(
            SELECT 
              gid as masterid, 
              name,
              'waterworks' as layer,
              ST_CENTROID(geom) as geom
            FROM water_twrks
            UNION ALL
            SELECT 
              gid as masterid, 
              zone, 
              'zones' as layer,
              ST_CENTROID(geom) as geom
            FROM zones
          )
          SELECT row_to_json(featurecollection) AS json FROM (
            SELECT
              'FeatureCollection' AS type,
              array_to_json(array_agg(feature)) AS features
            FROM (
              SELECT
              'Feature' AS type,
              ST_AsGeoJSON(ST_SetSRID(geom,4326))::json AS geometry,
              row_to_json((
                SELECT t FROM (
                  SELECT
                    16 as maxzoom,
                    8 as minzoom
                ) AS t
              )) AS tippecanoe,
              row_to_json((
                SELECT p FROM (
                SELECT
                  masterid,
                  name,
                  layer
                ) AS p
              )) AS properties
              FROM annotations
              WHERE NOT ST_IsEmpty(geom)
            ) AS feature
          ) AS featurecollection
          `
        }
    ],
};
