import Sequelize from 'sequelize';

const db = new Sequelize('newsfeed', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

const UserModel = db.define('user', {
  username: { type: Sequelize.STRING },
  firstname: { type: Sequelize.STRING },
  lastname: { type: Sequelize.STRING },
});

const TopicModel = db.define('topic', {
  name: { type: Sequelize.STRING },
  description: { type: Sequelize.STRING },
});

const NewsModel = db.define('news', {
  title: { type: Sequelize.STRING },
  content: { type: Sequelize.STRING },
});

const SubscriptionModel = db.define('subscription');
const NewsTopicModel = db.define('news_topic');

UserModel.hasMany(SubscriptionModel);
TopicModel.hasMany(SubscriptionModel);
TopicModel.belongsToMany(NewsModel, { through: NewsTopicModel });
NewsModel.belongsToMany(TopicModel, { through: NewsTopicModel });

const User = db.models.user;
const Topic = db.models.topic;
const Subscription = db.models.subscription;
const News = db.models.news;
const NewsTopic = db.models.news_topic;

/*
// uncommment for creating database tables and some fake data for testing
import _ from 'lodash';
import casual from 'casual';
db.sync({ force: true }).then(() => {
  const createSubscriptions = _.after(10, () => {
    _.times(10, () => {
      return SubscriptionModel.create({
        topicId: Math.floor(Math.random() * 10) + 1,
        userId: Math.floor(Math.random() * 10) + 1,
      }).then(() => {
        return NewsTopicModel.create({
          topicId: Math.floor(Math.random() * 10) + 1,
          newsId: Math.floor(Math.random() * 10) + 1,
        });
      });
    });
  });

  _.times(10, () => {
    return UserModel.create({
      username: casual.username,
      firstname: casual.first_name,
      lastname: casual.last_name,
    }).then(() => {
      return TopicModel.create({
        name: `topic - ${casual.title}`,
        description: casual.short_description,
      }).then(() => {
        return NewsModel.create({
          title: `new - ${casual.title}`,
          content: casual.sentences(3),
        }).then(() => {
          return createSubscriptions();
        });
      });
    });
  });
});
*/

export { User, Topic, Subscription, News, NewsTopic };
