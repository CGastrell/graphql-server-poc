import { User, Topic, News, NewsTopic } from './connectors';
import _ from 'lodash';

const resolvers = {
  Query: {
    user(__, args) {
      return User.find({ where: args });
    },
  },
  User: {
    news(user) {
      return user.getSubscriptions((subscriptions) => {
        return subscriptions;
      }).then((subscriptions) => {
        const topicIds = _.map(subscriptions, (s) => { return s.topicId; });
        return NewsTopic.findAll({ where: { topicId: { $in: topicIds } } });
      }).then((newsTopics) => {
        const newsIds = _.map(newsTopics, (n) => { return n.newsId; });
        return News.findAll({ where: { id: { $in: newsIds } } });
      }).then((news) => {
        return news;
      });
    },
    subscriptions(user) {
      return user.getSubscriptions();
    },
  },
  Subscription: {
    user(subscription) {
      return User.findOne({ where: { id: subscription.userId } });
    },
    topic(subscription) {
      return Topic.findOne({ where: { id: subscription.topicId } });
    },
  },
  News: {
    topics(news) {
      return news.getTopics();
    },
  },
  Topic: {
    news(topic) {
      return topic.getNews();
    },
  },
};

export default [resolvers];
