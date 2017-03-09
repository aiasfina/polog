FROM ubuntu:16.04

RUN apt-get update \
  && apt-get install -y git make gcc curl build-essential \
  && apt-get install -y libssl-dev libreadline-dev zlib1g-dev libpq-dev \
  && apt-get install -y libyaml-dev libxml2-dev libxslt-dev \
  && rm -rf /var/lib/apt/lists/*

ENV RBENV_PATH /var/.rbenv
ENV PATH $RBENV_PATH/bin:$PATH

RUN git clone --depth=1 https://github.com/rbenv/rbenv.git $RBENV_PATH \
  && cd $RBENV_PATH && src/configure && make -C src

RUN git clone --depth=1 https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build \
  && git clone --depth=1 git://github.com/sstephenson/rbenv-gem-rehash.git ~/.rbenv/plugins/rbenv-gem-rehash \
  && git clone --depth=1 git://github.com/rkh/rbenv-update.git ~/.rbenv/plugins/rbenv-update \
  && git clone --depth=1 https://github.com/sstephenson/rbenv-vars.git ~/.rbenv/plugins/ruby-vars

RUN echo 'eval "$(rbenv init -)"' >> /etc/profile.d/rbenv.sh # or /etc/profile
RUN echo 'eval "$(rbenv init -)"' >> .bashrc

RUN rbenv install 2.4.0
RUN rbenv global 2.4.0
RUN eval "$(rbenv init -)"

RUN echo 'gem: --no-rdoc --no-ri' >> /.gemrc

RUN /bin/bash -l -c 'gem install bundler'

ENV APP_DIR /var/project/polog/
RUN mkdir -p APP_DIR
ADD Gemfile Gemfile.lock $APP_DIR
WORKDIR $APP_DIR
RUN /bin/bash -l -c 'bundle install'
ADD . $APP_DIR

CMD ["bash", "app_cmd.sh"]