import Item from './item';
import classes from './item-list.module.css';

function ItemList(props) {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          slug={item.slug}
          title={item.title}
          location={item.location}
          date={item.date}
          image={item.image}
        />
      ))}
    </ul>
  );
}

export default ItemList;