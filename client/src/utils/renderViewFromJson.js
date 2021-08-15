function renderViewFromJson(create, mapper, schema) {
  if (typeof schema === "undefined") {
    schema = mapper;
    mapper = null;
  }
  
  if (schema === null) {
    return null;
  }

  if (typeof schema === "string") {
    return schema;
  }

  if (!isPlainObject(schema)) {
    throw new Error("schema must be a string or a plain object");
  }

  const hasNonEmptySchemaType = (
    schema.type &&
    typeof schema.type === "string" &&
    schema.type.trim() !== ""
  );

  if (! hasNonEmptySchemaType) {
    throw new Error("schema.type must be a non-empty string");
  }

  schema.type = schema.type.trim();

  if (schema.props !== undefined && !isPlainObject(schema.props)) {
    throw new Error("schema.props must be a plain object");
  }

  let type = schema.type;
  const props = schema.props || null;
  const children = schema.children && [].concat(schema.children).map(renderViewFromJson.bind(null, create, mapper));

  mapper && (type = mapper(type, props));

  return create.apply(create, [].concat([type, props]).concat(children));
}

function isPlainObject(maybe) {
  return (
    maybe !== null &&
    typeof maybe === "object" &&
    Object.prototype.toString.call(maybe) === "[object Object]"
  );
}

module.exports = renderViewFromJson;
