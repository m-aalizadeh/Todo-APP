package com.maryamaalizadeh.modo.batch;

import com.maryamaalizadeh.modo.model.Todo;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.data.MongoItemWriter;
import org.springframework.batch.item.data.builder.MongoItemWriterBuilder;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    private final String[] FIELD_NAMES = new String[] {"userId", "title", "description","dueDate", "priority", "status"};

    @Autowired
    private JobBuilderFactory jobBuilderFactory;

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Bean
    public FlatFileItemReader<TodoInput> reader(){
        return new FlatFileItemReaderBuilder<TodoInput>().name("TodoItemReader")
                .resource(new ClassPathResource("todo-sample-data.csv")).delimited().names(FIELD_NAMES)
                .fieldSetMapper(new BeanWrapperFieldSetMapper<TodoInput>(){
                    {
                        setTargetType(TodoInput.class);
                    }
                }).build();
    }

    @Bean
    public MongoItemWriter<Todo> writer(MongoTemplate mongoTemplate){
        return new MongoItemWriterBuilder<Todo>().template(mongoTemplate).collection("todo")
                .build();
    }

    @Bean
    public TodoDataProcessor processor(){
        return new TodoDataProcessor();
    }

    @Bean
    public Step Step1(FlatFileItemReader<TodoInput> itemReader, MongoItemWriter<Todo> itemWriter)throws Exception{
        return this.stepBuilderFactory.get("step1").<TodoInput, Todo>chunk(5).reader(itemReader)
                .processor(processor()).writer(itemWriter).build();
    }

    @Bean
    public Job updateUserJob(JobCompletionNotificationListener listener, Step step1)
            throws Exception {

        return this.jobBuilderFactory.get("updatedTodoJob").incrementer(new RunIdIncrementer())
                .listener(listener).start(step1).build();
    }



}
